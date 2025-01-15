import { useTranslation } from 'eitri-i18n'

export default function ShippingMethods(props) {
	const { customLogisticInfo, onSelectCustomLogistiInfoOption, ...rest } = props

	const { t } = useTranslation()

	const handleMethodChange = option => {
		onSelectCustomLogistiInfoOption(option)
	}

	if (!customLogisticInfo || customLogisticInfo?.options.length === 0) {
		return null
	}

	return (
		<View {...rest}>
			<Text
				fontWeight='bold'
				fontSize='extra-small'
				marginBottom='nano'>
				{t('shippingMethods.txtSelectDelivery')}
			</Text>
			<View
				width='100%'
				direction='column'
				borderRadius='small'
				borderWidth='hairline'
				borderColor='neutral-700'
				paddingHorizontal='small'>
				{customLogisticInfo &&
					customLogisticInfo?.options.map((option, index) => (
						<Touchable
							key={option.label}
							onPress={() => handleMethodChange(option)}
							borderBottomWidth={index < customLogisticInfo?.options.length - 1 ? 'hairline' : 'none'}
							borderColor='neutral-700'>
							<View
								paddingVertical='small'
								justifyContent='between'
								paddingHorizontal='extra-small'
								alignItems='center'
								width='100%'
								display='flex'>
								<View
									direction='row'
									alignItems='center'
									gap={12}>
									<Radio checked={option.isCurrent} />
									<View
										direction='column'
										gap='6px'>
										<Text>{option.label}</Text>
										<Text
											fontSize='nano'
											color='neutral-700'>
											{option?.shippingEstimate}
										</Text>
									</View>
								</View>
								<View
									width='20%'
									borderLeftWidth='hairline'
									borderColor='neutral-700'
									height={35}
									direction='row'
									alignItems='center'
									paddingLeft='extra-small'>
									<Text>{option.price}</Text>
								</View>
							</View>
						</Touchable>
					))}
			</View>
		</View>
	)
}
