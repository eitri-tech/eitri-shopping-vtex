import { Loading } from 'eitri-shopping-vtex-components-shared'
import { useLocalShoppingCart } from '../../providers/LocalCart'
import { useTranslation } from 'eitri-i18n'

export default function GiftCardInput(props) {
	const { cart, setPaymentOption } = useLocalShoppingCart()
	const [isLoading, setIsLoading] = useState(false)
	const [showGiftCardInput, setShowGiftInput] = useState(false)
	const [redemptionCode, setRedemptionCode] = useState('')
	const { t } = useTranslation()

	const handleGiftCardChange = async giftCard => {
		try {
			const payload = {
				payments: cart.payments ? cart.payments : [],
				giftCards: giftCard || []
			}
			await setPaymentOption(payload)
			setIsLoading(false)
		} catch (error) {
			console.error('handleGiftCardChange Error', error)
		}
	}

	const addGiftCard = () => {
		if (cart.giftCards.length === 0) {
			setIsLoading(true)
			const giftCard = [
				{
					inUse: true,
					redemptionCode: redemptionCode.trim()
				}
			]
			handleGiftCardChange(giftCard)
			setRedemptionCode('')
			return
		}
	}

	const removeGiftCart = async redemptionCode => {
		const newGiftCardList = cart.giftCards.filter(gift => gift.redemptionCode !== redemptionCode)
		handleGiftCardChange(newGiftCardList)
	}

	return (
		<View
			direction='column'
			gap={20}>
			{cart?.giftCards?.length === 0 && !isLoading && (
				<>
					<Touchable onPress={() => setShowGiftInput(!showGiftCardInput)}>
						<Text
							color='primary-500'
							textDecoration='underline'>
							{showGiftCardInput ? t('giftCardInput.txtHideGiftCard') : t('giftCardInput.txtAddGiftCard')}
						</Text>
					</Touchable>
					{showGiftCardInput && (
						<View direction='column'>
							<View
								direction='row'
								gap='10px'>
								<Input
									placeholder={t('giftCardInput.labelGiftCard')}
									value={redemptionCode}
									onChange={text => {
										setRedemptionCode(text)
									}}
								/>
								<Touchable onPress={addGiftCard}>
									<View
										backgroundColor='primary-300'
										borderRadius='micro'
										width='46px'
										height='50px'
										direction='column'
										paddingHorizontal='nano'
										justifyContent='center'
										alignItems='center'>
										<Text
											fontSize='medium'
											color='neutral-100'>
											{t('giftCardInput.labelButtonOk')}
										</Text>
									</View>
								</Touchable>
							</View>
						</View>
					)}
				</>
			)}
			{isLoading && <Loading inline />}
			{cart?.giftCards?.length > 0 &&
				cart?.giftCards?.map(gift => (
					<View
						key={gift}
						direction='row'
						justifyContent='between'
						marginTop='extra-small'>
						<View
							gap={5}
							direction='row'>
							<Text>{gift.redemptionCode}</Text>
						</View>
						<Touchable onPress={() => removeGiftCart(gift.redemptionCode)}>
							<View>
								<Text
									color='primary-500'
									textDecoration='underline'>
									{t('giftCardInput.labelButtonRemove')}
								</Text>
							</View>
						</Touchable>
					</View>
				))}
		</View>
	)
}
