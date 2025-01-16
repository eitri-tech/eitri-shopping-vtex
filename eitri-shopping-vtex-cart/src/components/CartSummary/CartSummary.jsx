import { CustomButton, Spacing, Divisor } from 'eitri-shopping-vtex-components-shared'
import { useTranslation } from 'eitri-i18n'
import { formatAmountInCents } from '../../utils/utils'

export default function CartSummary(props) {
	const { itemsValue, shipping, discounts, totalValue, goToCheckout, locale, currency } = props

	const [collapsed, setCollapsed] = useState(true)

	const { t } = useTranslation()

	return (
		<>
			<View
				backgroundColor='background-color'
				position='fixed'
				bottom='0'>
				<Divisor />

				<Spacing height={'10px'} />

				<Touchable
					onPress={() => setCollapsed(!collapsed)}
					display='flex'
					justifyContent='center'>
					<Icon
						iconKey={collapsed ? 'chevron-up' : 'chevron-down'}
						width={24}
						height={24}
					/>
				</Touchable>

				{!collapsed && (
					<>
						<View
							display='flex'
							direction='column'
							padding='small'>
							{itemsValue?.value && (
								<View
									display='flex'
									justifyContent='between'
									paddingTop='nano'>
									<Text
										color='neutral-500'
										fontSize='small'>
										{t('cartSummary.txtSubtotal')}
									</Text>
									<Text fontSize='small'>{formatAmountInCents(itemsValue.value, locale, currency)}</Text>
								</View>
							)}
							{discounts?.value && (
								<View
									display='flex'
									justifyContent='between'
									paddingTop='nano'>
									<Text
										color='neutral-500'
										fontSize='small'>
										{t('cartSummary.txtDiscount')}
									</Text>
									<Text fontSize='small'>{formatAmountInCents(discounts.value, locale, currency)}</Text>
								</View>
							)}
							{shipping?.value && (
								<View
									display='flex'
									justifyContent='between'
									paddingTop='nano'>
									<Text
										color='neutral-500'
										fontSize='small'>
										{t('cartSummary.txtDelivery')}
									</Text>
									<Text fontSize='small'>{formatAmountInCents(shipping.value, locale, currency)}</Text>
								</View>
							)}
							{totalValue && (
								<View
									display='flex'
									justifyContent='between'
									paddingTop='nano'>
									<Text
										color='neutral-900'
										fontWeight='bold'
										fontSize='medium'>
										{t('cartSummary.txtTotal')}
									</Text>
									<Text
										fontSize='medium'
										fontWeight='bold'
										color='secondary-500'>
										{formatAmountInCents(totalValue, locale, currency)}
									</Text>
								</View>
							)}
						</View>
					</>
				)}

				<Spacing height={'10px'} />

				<View
					display='flex'
					width='100vw'
					justifyContent='center'
					alignItems='center'>
					<CustomButton
						marginTop='large'
						borderRadius='pill'
						label={t('cartSummary.labelFinish')}
						onPress={goToCheckout}
						block
					/>
				</View>
				<Spacing height={'16px'} />
				<View bottomInset />
			</View>

			<Spacing height={collapsed ? '111px' : '224px'} />
		</>
	)
}
