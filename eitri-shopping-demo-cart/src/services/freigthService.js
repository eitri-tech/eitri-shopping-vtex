import { Vtex } from 'eitri-shopping-vtex-shared'
import { cartShippingResolver } from '../utils/cartShippingResolver'

export default async function setFreight(cart, shippingOptions) {
	try {
		const newCart = await Vtex.checkout.setLogisticInfo({
			logisticsInfo: generateLogisticInfoPayload(cart?.address?.addressId, shippingOptions.slas),
			clearAddressIfPostalCodeNotFound: false,
			selectedAddresses: cart?.shipping?.selectedAddresses
		})

		return newCart
	} catch (error) {
		console.error('setFreight', error)
	}
}

export const setNewAddress = async (cart, postalCode) => {
	try {
		const resultCep = await Vtex.checkout.resolveZipCode(postalCode)

		const { street, neighborhood, city, state, country, geoCoordinates } = resultCep

		const logisticsInfo = generateLogisticInfoPayload(
			null,
			cart?.items?.map((item, index) => {
				return {
					itemIndex: index,
					deliveryChannel: null,
					id: null
				}
			})
		)

		const selectedAddresses = generateSelectedAddressesPayload({
			postalCode,
			street,
			neighborhood,
			city,
			state,
			country,
			geoCoordinates
		})

		return await Vtex.checkout.setLogisticInfo({
			logisticsInfo: logisticsInfo,
			clearAddressIfPostalCodeNotFound: false,
			selectedAddresses: selectedAddresses
		})
	} catch (error) {
		console.error('getZipCode Error', error)
	}
}

export const updateAddress = async (cart, address) => {
	const { addressId } = address

	const logisticsInfo = generateLogisticInfoPayload(
		addressId,
		cart?.logisticsInfo?.map(logInfo => {
			return {
				itemIndex: logInfo.itemIndex,
				deliveryChannel: logInfo.selectedDeliveryChannel,
				id: logInfo.selectedSla
			}
		})
	)

	const selectedAddresses = generateSelectedAddressesPayload(address)

	const newCart = await Vtex.checkout.setLogisticInfo({
		logisticsInfo: logisticsInfo,
		clearAddressIfPostalCodeNotFound: false,
		selectedAddresses: selectedAddresses
	})

	return newCart
}

const generateLogisticInfoPayload = (addressId, shippingOptions) => {
	return shippingOptions?.map(option => {
		return {
			addressId,
			itemIndex: option.itemIndex,
			selectedDeliveryChannel: option.deliveryChannel,
			selectedSla: option.id
		}
	})
}

const generateSelectedAddressesPayload = address => {
	const {
		addressType,
		addressId,
		postalCode,
		complement,
		number,
		street,
		neighborhood,
		city,
		state,
		country,
		geoCoordinates,
		receiverName,
		reference,
		isDisposable
	} = address

	return [
		{
			addressType: addressType || 'residential',
			receiverName,
			addressId,
			isDisposable: isDisposable,
			postalCode: postalCode,
			city: city,
			state: state,
			country: country,
			street: street,
			number: number,
			neighborhood: neighborhood,
			complement: complement,
			reference,
			geoCoordinates: geoCoordinates.map(coord => coord),
			addressQuery: ''
		},
		{
			addressType: 'search',
			receiverName,
			isDisposable: isDisposable,
			postalCode: postalCode,
			city: city,
			state: state,
			country: country,
			street: street,
			number: number,
			neighborhood: neighborhood,
			complement: complement,
			reference,
			geoCoordinates: geoCoordinates.map(coord => coord),
			addressQuery: ''
		}
	]
}

export const simulateFreight = async (cart, zipCode) => {
	try {
		const address = await Vtex.checkout.resolveZipCode(zipCode)
		const { postalCode, city, state, street, neighborhood, country, geoCoordinates } = address

		const itemsPayload = cart.items.map(item => {
			return { id: item.id, quantity: item.quantity, seller: item.seller }
		})

		const cartSimulationPayload = {
			items: itemsPayload,
			shippingData: {
				selectedAddresses: [
					{
						addressType: '',
						receiverName: '',
						addressId: '',
						isDisposable: true,
						postalCode: postalCode,
						city: city,
						state: state,
						country: country,
						street: street,
						number: null,
						neighborhood: neighborhood,
						complement: null,
						reference: null,
						geoCoordinates: geoCoordinates
					}
				]
			}
		}

		const result = await Vtex.cart.simulateCart(cartSimulationPayload)
		const freightOptions = cartShippingResolver({
			shippingData: { address: true, logisticsInfo: result.logisticsInfo }
		})
		return freightOptions
	} catch (error) {
		console.error('Error fetching freight simulation', error)
		throw error
	}
}
