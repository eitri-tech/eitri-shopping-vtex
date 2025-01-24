import { CustomButton, Spacing, Divisor } from 'eitri-shopping-vtex-components-shared'
import { useTranslation } from 'eitri-i18n'
import { formatAmountInCents } from '../../utils/utils'
import {useLocalShoppingCart} from "../../providers/LocalCart";
import {navigateToCheckout} from "../../services/navigationService";

export default function CartSummary(props) {
  const { cart } = useLocalShoppingCart()

	const [collapsed, setCollapsed] = useState(true)

  const [itemsValue, setItemsValue] = useState({ value: null })
  const [shipping, setShipping] = useState({ value: null })
  const [discounts, setDiscounts] = useState({ value: null })

	const { t } = useTranslation()

  useEffect(() => {
    if (!cart) return
    setItemsValue(getTotalizerById(cart.totalizers, 'Items'))
    setShipping(getTotalizerById(cart.totalizers, 'Shipping'))
    setDiscounts(getTotalizerById(cart.totalizers, 'Discounts'))
  }, [cart])

  const getTotalizerById = (totalizers, id) => totalizers.find(item => item.id === id)

  const goToCheckout = async () => {
    if (isValidToProceed(cart)) {
      navigateToCheckout(cart?.orderFormId)
    }
  }

  const isValidToProceed = cart => {
    if (!cart) return false
    if (!cart?.items) return false
    if (cart?.shipping?.shippingUnavailable) return false
    return cart?.items.length !== 0
  }

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
									<Text fontSize='small'>{formatAmountInCents(itemsValue.value)}</Text>
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
									<Text fontSize='small'>{formatAmountInCents(discounts.value)}</Text>
								</View>
							)}
							{shipping && (
								<View
									display='flex'
									justifyContent='between'
									paddingTop='nano'>
									<Text
										color='neutral-500'
										fontSize='small'>
										{t('cartSummary.txtDelivery')}
									</Text>
									<Text fontSize='small'>{formatAmountInCents(shipping.value)}</Text>
								</View>
							)}
							{cart?.value && (
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
										{formatAmountInCents(cart.value)}
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
