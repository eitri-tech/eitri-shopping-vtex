import Eitri from 'eitri-bifrost'
import { formatAmountInCents } from '../utils/utils'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { CustomButton, Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-components-shared'
import { clearCart, startPayment } from '../services/cartService'
import Recaptcha from '../services/Recaptcha'
import UserData from '../components/FinishCart/UserData'
import SelectedPaymentData from '../components/FinishCart/SelectedPaymentData'
import DeliveryData from '../components/FinishCart/DeliveryData'
import { requestLogin } from '../services/navigationService'
import { sendPageView } from '../services/trackingService'
import { useTranslation } from 'eitri-i18n'

let interval

export default function FinishCart() {
	const { cart, selectedPaymentData, startCart, cartIsLoading } = useLocalShoppingCart()
	const { t } = useTranslation()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState({ state: false, message: '' })
	const [unavailableItems, setUnavailableItems] = useState([])

	const recaptchaRef = useRef()

	const RECAPTCHA_SITE_KEY = '6LcKXBMqAAAAAKsqevXXI4ZWr1enrPNrf25pmUs-'

	let captchaToken = null

	useEffect(() => {
		if (cart && cart?.items?.length > 0) {
			const unavailableItems = cart?.items?.filter(item => item.availability !== 'available')
			if (unavailableItems.length > 0) {
				setUnavailableItems(unavailableItems)
			}
		}
		sendPageView('Home')
		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [cart])

	const navigateToEditor = (path, canOpenWithoutLogin) => {
		if (canOpenWithoutLogin) {
			Eitri.navigation.navigate({
				path: path
			})
		} else {
			requestLogin().then(async () => {
				const updatedCart = await startCart()
				if (updatedCart.canEditData) {
					Eitri.navigation.navigate({
						path: path,
						state: { cart: cart }
					})
				}
			})
		}
	}

	const runPaymentScript = async () => {
		try {
			setIsLoading(true)

			if (selectedPaymentData?.groupName === 'creditCardPaymentGroup' && !captchaToken) {
				captchaToken = await recaptchaRef?.current?.getRecaptchaToken()
			}

			const paymentResult = await startPayment(selectedPaymentData, captchaToken, RECAPTCHA_SITE_KEY)

			if (paymentResult.status === 'completed') {
				clearCart()
				Eitri.navigation.navigate({ path: 'OrderCompleted', state: { orderId: paymentResult.orderId } })
				return
			}

			if (paymentResult?.paymentAuthorizationAppCollection?.[0]?.appName === 'vtex.pix-payment') {
				Eitri.navigation.navigate({ path: 'PixOrder', state: { paymentResult } })
				return
			}

			Eitri.navigation.navigate({ path: 'ExternalProviderOrder', state: { paymentResult } })


		} catch (error) {
			console.log('Erro no runPaymentScript', error)
			setError({
				state: true,
				message: t('finishCart.errorOrder')
			})
		} finally {
			setIsLoading(false)
			const tenSeconds = 30000
			setTimeout(() => {
				setError({ state: false, message: '' })
			}, tenSeconds)
		}
	}

	const onRecaptchaReady = async () => {
		captchaToken = await recaptchaRef?.current?.getRecaptchaToken()
		interval = setInterval(async () => {
			captchaToken = await recaptchaRef?.current?.getRecaptchaToken()
		}, 60000)
	}

	return (
		<Window
			bottomInset
			topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={true}
				contentText={t('finishCart.title')}
			/>

			{(cartIsLoading || isLoading) && <Loading fullScreen />}

			<View padding='large'>
				<>
					{error.state && (
						<View
							direction='column'
							gap='16px'
							backgroundColor='negative-700'
							padding='small'
							marginBottom='small'
							borderRadius='small'>
							<Text color='neutral-100'>{error.message}</Text>
						</View>
					)}

					{unavailableItems.length > 0 && (
						<View
							direction='column'
							gap='16px'
							backgroundColor='negative-700'
							padding='small'
							marginBottom='small'
							borderRadius='small'>
							<Text color='neutral-100'>{t('finishCart.errorItems')}</Text>
						</View>
					)}

					<View
						direction='row'
						width='100%'
						justifyContent='between'
						alignItems='center'
						marginBottom='large'
						paddingTop='nano'>
						<Text
							color='neutral-700'
							fontWeight='bold'>{`${cart?.items?.length} ${
							cart?.items?.length < 2 ? t('finishCart.txtProduct') : t('finishCart.txtProducts')
						}`}</Text>
						<Text
							fontWeight='bold'
							color='primary-700'>
							{`${t('finishCart.txtTotal')} ${formatAmountInCents(cart.netValue || cart.value)}`}
						</Text>
					</View>

					<View
						direction='column'
						gap='16px'>
						{cart && (
							<UserData
								clientProfileData={cart?.clientProfileData}
								onPress={() => navigateToEditor('PersonalData', cart?.canEditData)}
							/>
						)}

						<DeliveryData
							shipping={cart.shipping}
							address={cart.shipping?.address}
							clientProfileData={cart.clientProfileData}
							onPress={() => navigateToEditor('AddNewShippingAddress', cart.canEditData)}
						/>

						{unavailableItems.length === 0 && (
							<SelectedPaymentData
								payments={cart.payments}
								selectedPaymentData={selectedPaymentData}
								onPress={() => navigateToEditor('PaymentData', true)}
							/>
						)}
					</View>

					<>
						<View height='90px' />
						<View
							backgroundColor='background-color'
							position='fixed'
							bottom={0}
							left={0}
							right={0}>
							<View
								padding='large'
								direction='column'
								alignItems='center'
								justifyContent='center'>
								<CustomButton
									borderRadius='pill'
									marginVertical='small'
									label={t('finishCart.labelButton')}
									fontSize='medium'
									backgroundColor='primary-500'
									block
									onPress={runPaymentScript}
								/>
							</View>

							<View
								bottomInset
								width='100%'
							/>
						</View>
					</>
				</>
			</View>

			<Recaptcha
				ref={recaptchaRef}
				siteKey={RECAPTCHA_SITE_KEY}
				onRecaptchaReady={onRecaptchaReady}
			/>
		</Window>
	)
}
