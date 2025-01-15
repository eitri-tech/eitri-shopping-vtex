import Eitri from 'eitri-bifrost'
import { Loading } from 'eitri-shopping-demo-shared'
import { useTranslation } from 'eitri-i18n'

export default function Freight(props) {
	const { cart, changeCartAddress, updateCartFreight, locale, currency } = props

	const [zipCode, setZipCode] = useState('')
	const [shipping, setShipping] = useState(null)
	const [isUnavailable, setIsUnavailable] = useState(false)
	const [messagesError, setMessagesError] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const [selectedOption, setSelectedOption] = useState('')

	const [error, setError] = useState(false)

	const { t } = useTranslation()

	useEffect(() => {
		const shipping = cart?.shipping

		if (shipping) {
			const { address, postalCode } = shipping
			const { geoCoordinates } = address

			if (geoCoordinates.length === 0 && cart?.canEditData) {
				setError(t('freight.errorCep'))
				setZipCode(postalCode)
			} else {
				setShipping(shipping)
				setZipCode(postalCode)
				setError('')
				if (shipping?.shippingUnavailable) {
					setIsUnavailable(shipping.shippingUnavailable)
					setMessagesError(cart?.messages)
				}
			}
		} else {
			getZipCodeOnStorage()
		}
	}, [cart])

	const getZipCodeOnStorage = async () => {
		let postalCode = await Eitri.sharedStorage.getItem('zipCode')
		setZipCode(postalCode || '')
	}

	const setZipCodeOnStorage = async zipCode => {
		await Eitri.sharedStorage.setItem('zipCode', zipCode)
	}

	const onInputZipCode = value => {
		setZipCode(value)
	}

	const fetchFreight = async () => {
		setIsLoading(true)
		try {
			if (!zipCode) {
				return
			}
			if (!(zipCode.length == 8 || zipCode.length == 9)) {
				setError(t('freight.errorCep'))
				return
			}
			setError('')
			setZipCodeOnStorage(zipCode)
			await changeCartAddress(cart, zipCode)
			setIsLoading(false)
		} catch (error) {
			console.error('Error fetching freight [1]', error)
			setError(t('freight.errorCalcFreight'))
		}
	}

	const onSetCartFreight = async option => {
		if (selectedOption !== option.label) {
			setSelectedOption(option.label)
			await setCartFreight(option)
			setSlaOptionVisible(false)
		}
	}

	const setCartFreight = async option => {
		try {
			await updateCartFreight(cart, option)
		} catch (error) {
			console.error('setCartFreight Error', error)
			setError(t('freight.errorEditFreight'))
		}
	}

	const getMessageError = label => {
		const message = messagesError.find(item => item.code === 'cannotBeDelivered')
		return (
			<View
				width='100%'
				paddingHorizontal='small'>
				<Text fontWeight='bold'>{label}</Text>
				{message && (
					<Text
						fontSize='nano'
						color='tertiary-700'>
						{message.fields.skuName}
					</Text>
				)}
			</View>
		)
	}

	return (
		<View>
			<View padding='medium'>
				<Text
					fontSize='medium'
					fontWeight='bold'>
					{t('freight.txtDelivery')}
				</Text>

				{cart?.canEditData ? (
					<View
						display='flex'
						justifyContent='between'
						alignItems='center'>
						<View
							display='flex'
							marginVertical='small'
							paddingVertical='nano'
							borderWidth='hairline'
							borderColor='neutral-300'
							borderRadius='pill'
							width='60vw'>
							<MaskedInput
								placeholder={t('freight.labelZipCode')}
								value={zipCode}
								onChange={onInputZipCode}
								maxLength={9}
								mask='99999-999'
								inputMode='numeric'
								color='accent-100'
								borderColor='accent-100'
								showSearchButton={false}
								showClearInput={false}
								borderHidden={true}
							/>
						</View>
						<Touchable onPress={fetchFreight}>
							<View
								display='flex'
								height='50px'
								width='30vw'
								borderWidth='hairline'
								justifyContent='center'
								borderRadius='pill'
								borderColor='secondary-300'
								alignItems='center'>
								{isLoading ? (
									<Loading
										width='30px'
										color='secondary-300'
									/>
								) : (
									<Text
										fontWeight='bold'
										color={'secondary-300'}>
										{t('freight.txtCalculate')}
									</Text>
								)}
							</View>
						</Touchable>
					</View>
				) : (
					<View marginTop='nano'>
						<Text fontWeight='medium'>{`[b]${t('freight.labelZipCode')}[/b]: ${shipping?.address?.postalCode}`}</Text>
					</View>
				)}

				{error && (
					<View paddingBottom='small'>
						<Text color={'tertiary-700'}>{error}</Text>
					</View>
				)}
				{shipping ? (
					<View
						display='flex'
						direction='column'
						marginVertical='small'
						paddingVertical='small'
						borderWidth='hairline'
						borderColor='neutral-300'
						borderRadius='circular'
						alignItems='center'
						justifyContent='between'>
						{shipping?.options.map((item, index) => (
							<View
								key={index}
								display='flex'
								direction='row'
								alignItems='center'
								width='100%'>
								{isUnavailable ? (
									getMessageError(item?.label)
								) : (
									<>
										{isLoading ? (
											<View
												width='100%'
												display='flex'
												alignItems='center'
												justifyContent='center'>
												<Loading />
											</View>
										) : (
											<>
												<View
													width='25%'
													padding='small'>
													<Radio
														name='shippingOptions'
														value={item?.slas[0]?.id}
														checked={item?.slas[0]?.selected}
														onChange={() => onSetCartFreight(item)}
													/>
												</View>
												<View
													width='100%'
													display='flex'
													direction='column'>
													<Text fontWeight='bold'>{item?.label}</Text>
													<Text
														fontSize='nano'
														color='neutral-500'>
														{item?.shippingEstimate}
													</Text>
													{item.isPickupInPoint && (
														<Text
															fontSize='nano'
															color='neutral-500'>
															{item?.pickUpAddress}
														</Text>
													)}
												</View>
												<View
													display='flex'
													width='30%'
													justifyContent='end'
													padding='small'>
													<Text>{item?.price}</Text>
												</View>
											</>
										)}
									</>
								)}
							</View>
						))}
					</View>
				) : (
					<Touchable onPress={() => console.log('Não sei meu frete clicado')}>
						<Text
							color='secondary-300'
							textDecoration='underline'>
							{t('freight.txtUnknow')}
						</Text>
					</Touchable>
				)}
			</View>
		</View>
	)
}
