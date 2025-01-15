import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'
import fetchFreight from '../../services/freightService'

export default function Freight(props) {
	const { currentSku } = props

	const { t } = useTranslation()

	const [collapsed, setCollapsed] = useState(false)
	const [zipCode, setZipCode] = useState('')
	const [freightOptions, setFreightOptions] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		handleZipCode()
	}, [])

	const handleZipCode = async () => {
		const postalCodeStorage = await Eitri.sharedStorage.getItem('zipCode')
		if (postalCodeStorage) {
			setZipCode(postalCodeStorage)
			handleFreight(postalCodeStorage)
		}
	}

	const onInputZipCode = value => {
		setZipCode(value)
	}

	const handleFreight = async zipCode => {
		if (loading) return

		setLoading(true)

		try {
			let freightOpt = await fetchFreight(zipCode, currentSku)
			setFreightOptions(freightOpt)
			setZipCodeOnStorage(zipCode)
		} catch (error) {
			console.error('Error handleFreight', error)
		}

		setLoading(false)
	}

	const toggleCollapsedState = () => {
		setCollapsed(!collapsed)
	}

	const setZipCodeOnStorage = async zipCode => {
		await Eitri.sharedStorage.setItem('zipCode', zipCode)
	}

	return (
		<View>
			<Touchable onPress={toggleCollapsedState}>
				<View
					display='flex'
					alignItems='center'
					justifyContent='between'
					width='100%'>
					<Text
						fontSize='large'
						fontWeight='bold'>
						{t('freight.txtCalculate')}
					</Text>
					<Icon
						iconKey={collapsed ? 'chevron-down' : 'chevron-up'}
						width={26}
					/>
				</View>
			</Touchable>

			{!collapsed && (
				<View>
					<Text fontSize='extra-small'>{t('freight.txtCalculateDeadline')}</Text>

					<View
						display='flex'
						justifyContent='between'
						gap={12}
						alignItems='center'>
						<View
							display='flex'
							marginVertical='small'
							paddingVertical='nano'
							height='50px'
							borderWidth='hairline'
							borderColor='neutral-300'
							borderRadius='pill'
							grow={1}>
							<MaskedInput
								placeholder={t('freight.labelZipCode')}
								value={zipCode}
								maxLength={9}
								mask='99999-999'
								inputMode='numeric'
								color='accent-100'
								borderColor='accent-100'
								showSearchButton={false}
								showClearInput={false}
								borderHidden={true}
								onChange={onInputZipCode}
							/>
						</View>

						<Touchable
							borderWidth='hairline'
							borderColor='secondary-300'
							borderRadius='pill'
							display='flex'
							height='50px'
							justifyContent='center'
							paddingHorizontal='extra-large'
							alignItems='center'
							grow={1}
							onPress={() => handleFreight(zipCode)}>
							<Text
								fontWeight='bold'
								color='secondary-300'>
								{t('freight.labelCalculate')}
							</Text>
						</Touchable>
					</View>

					{loading && (
						<View
							mode='skeleton'
							width='100%'
							height='100px'
							borderRadius='small'
						/>
					)}

					{
						!loading && freightOptions && freightOptions?.options?.length > 0 && (
							<View
								display='flex'
								direction='column'
								marginVertical='small'
								paddingVertical='small'
								borderWidth='hairline'
								borderColor='neutral-300'
								borderRadius='medium'
								alignItems='center'
								gap='10px'
								justifyContent='between'>
								{freightOptions?.options.map((item, index) => (
									<View
										key={index}
										display='flex'
										direction='column'
										alignItems='center'
										width='100%'>
										<View
											display='flex'
											alignItems='center'
											justifyContent='between'
											width='100%'
											paddingHorizontal='small'>
											<Text fontWeight='bold'>{item?.label}</Text>
											<Text>{item?.price}</Text>
										</View>
										<View
											display='flex'
											alignItems='center'
											justifyContent='between'
											width='100%'
											paddingHorizontal='small'>
											<Text
												fontSize='nano'
												color='neutral-500'>
												{item?.shippingEstimate}
											</Text>
										</View>
										{item.isPickupInPoint && (
											<View
												display='flex'
												alignItems='center'
												width='100%'
												paddingHorizontal='small'>
												<Text
													fontSize='nano'
													color='neutral-500'>
													{item.pickUpAddress}
												</Text>
											</View>
										)}
									</View>
								))}
							</View>
						)
						// TODO: verificar qual vai ser o link de redirecionamento
						// <Touchable onPress={() => console.log("Não sei meu frete clicado")}>
						//     <Text color='secondary-300' textDecoration='underline'>Não sei meu cep</Text>
						// </Touchable>
					}
				</View>
			)}
		</View>
	)
}
