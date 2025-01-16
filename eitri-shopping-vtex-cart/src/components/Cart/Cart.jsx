import CartItem from '../CartItem/CartItem'
import AlertItem from '../AlertItem/AlertItem'
import CartSummary from '../CartSummary/CartSummary'
import {  Spacing } from 'eitri-shopping-vtex-components-shared'
import { useLocalShoppingCart } from '../../providers/LocalCart'
import Freight from '../Freight/Freight'
import ModalOfferingGender from '../ModalOfferingGender/ModalOfferingGender'
import { addOpenTextFieldToCart } from '../../services/cartService'
import Coupon from '../Coupon/Coupon'
import { useTranslation } from 'eitri-i18n'

export default function Cart(props) {
	const { cart, changeCartAddress, updateCartFreight, addOffering, removeOffering, applyCouponToCart, removeCouponToCart, cartIsLoading } = useLocalShoppingCart()

	const { iconAlert, onChangeQuantityItem, handleRemoveCartItem, goToCheckout, locale, currency } = props

	const [itemsValue, setItemsValue] = useState({ value: null })
	const [shipping, setShipping] = useState({ value: null })
	const [discounts, setDiscounts] = useState({ value: null })
	const [maxInstallments, setMaxInstallments] = useState(0)
	const [showModalOfferingGender, setShowModalOfferingGender] = useState(false)

	const [addOfferingParams, setAddOfferingParams] = useState({ itemIndex: -1, offeringId: '' })

	const { t } = useTranslation()

	useEffect(() => {
		setItemsValue(getTotalizerById(cart.totalizers, 'Items'))
		setShipping(getTotalizerById(cart.totalizers, 'Shipping'))
		setDiscounts(getTotalizerById(cart.totalizers, 'Discounts'))
		setMaxInstallments(findMaxInstallments(cart.paymentData?.installmentOptions))
	}, [cart])

	const getTotalizerById = (totalizers, id) => totalizers.find(item => item.id === id)

	const findMaxInstallments = installmentOptions => {
		let maxInstallments = 0

		installmentOptions?.forEach(option => {
			option.installments.forEach(installment => {
				if (installment.count > maxInstallments) {
					maxInstallments = installment.count
				}
			})
		})

		return maxInstallments
	}

	const hasMessage = itemEan => {
		let message = cart.messages.filter(item => item.code === 'withoutStock' && item.fields.ean == itemEan)

		return message[0] || null
	}

	const onAddOfferingToCart = async (itemIndex, offeringId) => {
		setAddOfferingParams({ itemIndex, offeringId })
		setShowModalOfferingGender(true)
	}

	const onRemoveOfferingFromCart = async (itemIndex, offeringId) => {
		removeOffering(itemIndex, offeringId)
	}

	const addOfferingGender = async gender => {
		setShowModalOfferingGender(false)
		await addOffering(addOfferingParams.itemIndex, addOfferingParams.offeringId)
		addOpenTextFieldToCart(`${t('cart.labelGiftWrapping')}: ${gender}`)
	}

	const cancelAddOfferingGender = () => {
		setShowModalOfferingGender(false)
	}

	const addCoupon = async coupon => {
		try {
			await applyCouponToCart(coupon)
		} catch (e) {
			console.error('Cart: addCoupon Error', e)
		}
	}

	const removeCoupon = async () => {
		try {
			await removeCouponToCart()
		} catch (e) {
			console.error('Cart: removeCoupon Error', e)
		}
	}

	return (
		<View
			display='flex'
			direction='column'
			width='100vw'>
			<Spacing height={'10px'} />
			{maxInstallments > 1 && (
				<AlertItem
					iconAlert={iconAlert}
					textAlert={`${t('cart.labelInstalmentUntil')} ${maxInstallments}x`}
				/>
			)}

			{cart?.items?.map(item => (
				<CartItem
					key={item.id}
					onChangeQuantityItem={onChangeQuantityItem}
					item={item}
					message={hasMessage(item.ean)}
					handleRemoveCartItem={handleRemoveCartItem}
					onAddOfferingToCart={onAddOfferingToCart}
					onRemoveOfferingFromCart={onRemoveOfferingFromCart}
					locale={locale}
					currency={currency}
				/>
			))}

			<Freight
				cart={cart}
				changeCartAddress={changeCartAddress}
				updateCartFreight={updateCartFreight}
				locale={locale}
				currency={currency}
			/>

			<Coupon
				cart={cart}
				addCoupon={addCoupon}
				removeCoupon={removeCoupon}
			/>

			<CartSummary
				itemsValue={itemsValue}
				shipping={shipping}
				discounts={discounts}
				totalValue={cart.value}
				goToCheckout={goToCheckout}
				locale={locale}
				currency={currency}
			/>

			<ModalOfferingGender
				show={showModalOfferingGender}
				onConfirm={addOfferingGender}
				onCancel={cancelAddOfferingGender}
			/>
		</View>
	)
}
