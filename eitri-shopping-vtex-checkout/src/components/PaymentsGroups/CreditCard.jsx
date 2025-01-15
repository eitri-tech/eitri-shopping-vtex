import MethodIcon from '../Icons/MethodIcon'
import CardIcon from '../Icons/CardIcons/CardIcon'
import { useLocalShoppingCart } from '../../providers/LocalCart'
import GroupsWrapper from './GroupsWrapper'
import Card from '../Icons/MethodIcons/Card'
import CheckoutInput from '../Checkout/CheckoutInput'
import { useTranslation } from 'eitri-i18n'

export default function CreditCard(props) {
	const { cart, selectedPaymentData, setSelectedPaymentData } = useLocalShoppingCart()

	const { paymentSystems, groupName } = props

	const [billingAddressSame, setBillingAddressSame] = useState(true)

	const { t } = useTranslation()
	
	useEffect(() => {
		if (selectedPaymentData?.cardInfo?.cardNumber && selectedPaymentData?.cardInfo?.cardNumber.length > 15) {
			const paymentSystem = paymentSystems?.find(method => {
				const regex = RegExp(method.validator.regex)
				return regex.test(selectedPaymentData?.cardInfo?.cardNumber)
			})

			if (paymentSystem) {
				setSelectedPaymentData(prev => ({ ...prev, paymentSystem }))
				selectInstallment(paymentSystem.installments[0])
			} else {
				setSelectedPaymentData(prev => ({ ...prev, paymentSystem: null }))
				selectInstallment(null)
			}
		} else {
			setSelectedPaymentData(prev => ({ ...prev, paymentSystem: null }))
			selectInstallment(null)
		}
	}, [selectedPaymentData?.cardInfo?.cardNumber])

	useEffect(() => {
		const { cardNumber, holderName, expirationDate, securityCode } = selectedPaymentData?.cardInfo ?? {}
		const { street, number, city, neighborhood, state, country, postalCode } =
			selectedPaymentData?.billingAddress ?? {}

		if (
			cardNumber &&
			holderName &&
			expirationDate &&
			securityCode &&
			street &&
			number &&
			city &&
			neighborhood &&
			state &&
			country &&
			postalCode
		) {
			const payload = {
				accountId: null,
				bin: null,
				hasDefaultBillingAddress: true,
				installments: `${selectedPaymentData?.cardInfo?.installment?.count}`,
				installmentsInterestRate: null,
				isLuhnValid: null,
				isRegexValid: null,
				paymentSystem: selectedPaymentData?.paymentSystem?.stringId,
				referenceValue: selectedPaymentData?.cardInfo?.installment?.value,
				tokenId: null,
				value: selectedPaymentData?.cardInfo?.installment?.total
			}

			setSelectedPaymentData({ ...selectedPaymentData, payload, isReadyToPay: true })
		}
	}, [selectedPaymentData?.cardInfo, selectedPaymentData?.cardInfo?.billingAddress])

	const onSelectThisGroup = () => {
		if (selectedPaymentData?.groupName !== groupName) {
			setSelectedPaymentData({
				groupName: groupName,
				cardInfo: {
					cardNumber: '',
					holderName: '',
					expirationDate: '',
					securityCode: ''
				},
				billingAddress: {
					street: cart?.shipping?.address?.street,
					number: cart?.shipping?.address?.number,
					city: cart?.shipping?.address?.city,
					neighborhood: cart?.shipping?.address?.neighborhood,
					state: cart?.shipping?.address?.state,
					country: cart?.shipping?.address?.country,
					postalCode: cart?.shipping?.address?.postalCode
				},
				isReadyToPay: false
			})
		}
	}

	const selectInstallment = installment => {
		setSelectedPaymentData(prev => ({
			...prev,
			cardInfo: {
				...prev.cardInfo,
				installment: installment
			}
		}))
	}

	const handleCardDataChange = (key, value) => {
		const cardInfo = { ...selectedPaymentData.cardInfo, [key]: value }
		setSelectedPaymentData({ ...selectedPaymentData, cardInfo })
	}

	const handleAddressChange = (key, value) => {
		const billingAddress = { ...selectedPaymentData.billingAddress, [key]: value }
		setSelectedPaymentData({ ...selectedPaymentData, billingAddress })
	}

	// Métodos que resolvem billing address
	const checkBillingAddressSame = () => {
		const billingAddressWillBeSame = !billingAddressSame

		if (billingAddressWillBeSame) {
			setBillingAddressSameOfShippingAddress()
		}

		setBillingAddressSame(billingAddressWillBeSame)
	}

	const setBillingAddressSameOfShippingAddress = () => {
		const { street, number, city, neighborhood, state, country, postalCode } = cart?.shipping?.address ?? {}
		const billingAddress = { street, number, city, neighborhood, state, country, postalCode }
		setSelectedPaymentData(prev => ({ ...prev, billingAddress }))
	}

	return (
		<GroupsWrapper
			title={t('creditCard.title')}
			icon={<Card />}
			onPress={onSelectThisGroup}
			isChecked={groupName === selectedPaymentData?.groupName}>
			<View paddingHorizontal='extra-small'>
				<Text fontWeight='bold'>Bandeiras aceitas:</Text>
				<View
					display='flex'
					justifyContent='between'
					marginTop='extra-small'
					gap={12}>
					{paymentSystems.map(system => {
						return (
							<View
								key={system.name}
								grow={1}
								direction='column'
								width={100 / paymentSystems.length + '%'}
								maxWidth={'20%'}
								gap={5}
								alignItems='center'>
								<View
									height={34}
									elevation='low'
									borderRadius='small'
									justifyContent='center'
									display='flex'
									width='100%'
									alignItems='center'>
									<CardIcon iconKey={system.name} />
								</View>
								<Text
									fontSize='quark'
									textAlign='center'>
									{system.name}
								</Text>
							</View>
						)
					})}
				</View>
			</View>

			<View
				display='flex'
				gap={10}
				direction='column'
				marginTop='small'
				paddingHorizontal='extra-small'>
				<CheckoutInput
					fontSize='extra-small'
					placeholder={t('creditCard.labelCardNumber')}
					value={selectedPaymentData?.cardInfo?.cardNumber}
					inputMode='numeric'
					onChange={text => handleCardDataChange('cardNumber', text)}
					mask='9999 9999 9999 9999'
				/>
				<CheckoutInput
					showClearInput={false}
					placeholder={t('creditCard.labelName')}
					value={selectedPaymentData?.cardInfo?.holderName}
					onChange={text => handleCardDataChange('holderName', text)}
				/>
				<View
					display='flex'
					gap={5}
					direction='row'>
					<View
						direction='row'
						display='flex'
						gap={5}>
						<View
							width='80%'
							direction='row'
							display='flex'
							gap={5}>
							<CheckoutInput
								placeholder={t('creditCard.labelValidity')}
								value={selectedPaymentData?.cardInfo?.expirationDate}
								onChange={text => handleCardDataChange('expirationDate', text)}
								inputMode='numeric'
								mask='99/99'
							/>
							<CheckoutInput
								placeholder={t('creditCard.labelCvv')}
								value={selectedPaymentData?.cardInfo?.securityCode}
								onChange={text => handleCardDataChange('securityCode', text)}
								inputMode='numeric'
								mask='999'
							/>
						</View>
						<View
							height={34}
							overflow='hidden'
							elevation='low'
							borderRadius='small'
							minWidth='20%'
							alignItems='center'
							justifyContent='center'
							direction='column'
							marginHorizontal='nano'>
							{selectedPaymentData?.cardInfo?.cardNumber?.length < 15 ? (
								<Text
									marginHorizontal='small'
									fontSize='small'>
									{t('creditCard.labelBrand')}
								</Text>
							) : (
								<View
									position='relative'
									top={2}>
									<CardIcon iconKey={selectedPaymentData?.paymentSystem?.name} />
								</View>
							)}
						</View>
					</View>
				</View>
				<View>
					<Dropdown
						required={true}
						placeholder={t('creditCard.labelInstallment')}
						onChange={selectInstallment}
						value={selectedPaymentData?.cardInfo?.installment?.label}>
						{selectedPaymentData?.paymentSystem?.installments?.map((option, index) => (
							<Dropdown.Item
								key={option.count}
								value={option}
								label={option.label}
							/>
						))}
					</Dropdown>
				</View>
				<View marginVertical='nano'>
					<Text fontWeight='bold'>{t('creditCard.labelBillingAddress')}</Text>
					{cart.shipping?.address && (
						<View
							marginVertical='nano'
							direction='row'
							gap={10}
							alignItems='center'
							sendFocusToInput>
							<Checkbox
								name='billingAddress'
								value='Sim'
								checked={billingAddressSame}
								onChange={checkBillingAddressSame}
							/>
							<Text>{t('creditCard.infoBillingAddress')}</Text>
						</View>
					)}
					{!billingAddressSame && (
						<View
							gap={8}
							direction='column'>
							<View>
								<CheckoutInput
									inputMode='numeric'
									maxLength={8}
									placeholder={t('creditCard.labelZipCode')}
									value={selectedPaymentData?.billingAddress?.postalCode}
									onChange={text => handleAddressChange('postalCode', text)}
									width='40%'
								/>
							</View>
							<View>
								<CheckoutInput
									placeholder={t('creditCard.labelAddress')}
									value={selectedPaymentData?.billingAddress?.street}
									onChange={text => handleAddressChange('street', text)}
								/>
							</View>

							<View
								direction='row'
								gap={16}>
								<View width='50%'>
									<CheckoutInput
										placeholder={t('creditCard.labelNumber')}
										value={selectedPaymentData?.billingAddress?.number}
										onChange={text => handleAddressChange('number', text)}
									/>
								</View>
								<View width='50%'>
									<CheckoutInput
										placeholder={t('creditCard.labelComplement')}
										value={selectedPaymentData?.billingAddress?.complement}
										onChange={text => handleAddressChange('complement', text)}
									/>
								</View>
							</View>
							<View>
								<CheckoutInput
									placeholder={t('creditCard.labelNeighborhood')}
									value={selectedPaymentData?.billingAddress?.neighborhood}
									onChange={text => handleAddressChange('neighborhood', text)}
								/>
							</View>
							<View
								direction='row'
								gap={16}>
								<View width='50%'>
									<CheckoutInput
										placeholder={t('creditCard.labelCity')}
										value={selectedPaymentData?.billingAddress?.city}
										onChange={text => handleAddressChange('city', text)}
									/>
								</View>
								<View width='50%'>
									<CheckoutInput
										placeholder={t('creditCard.labelState')}
										value={selectedPaymentData?.billingAddress?.state}
										onChange={text => handleAddressChange('state', text)}
									/>
								</View>
							</View>
						</View>
					)}
				</View>
			</View>
		</GroupsWrapper>
	)
}
