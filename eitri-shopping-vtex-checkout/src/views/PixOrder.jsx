import pixImg from '../assets/images/pix.png'
import Eitri from 'eitri-bifrost'
import { setScreenView, logEvent } from '../services/trackingService'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { CustomButton } from 'eitri-shopping-vtex-components-shared'
import { clearCart } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'

export default function PixOrder(props) {
	const [timeOut, setTimeOut] = useState(10 * 60)

	const [pixPayload, setPixPayload] = useState(null)

	let isMounted = true

	const { t } = useTranslation()

	useEffect(() => {
		if (props.location?.state?.pixData) {
			const appPayload = JSON.parse(props.location?.state?.pixData)

			setPixPayload(appPayload)

			checkPixStatus(appPayload.transactionId, appPayload.paymentId)

			const interval = setInterval(() => {
				setTimeOut(prev => prev - 1)
			}, 1000)

			return () => {
				isMounted = false
				clearInterval(interval)
			}
		}
	}, [props.location?.state?.pixData])

	useEffect(() => {
		if (timeOut <= 0) {
			Eitri.navigation.navigate({ path: 'Checkout/FinishCart' })
			return
		}
	}, [timeOut])

	useEffect(() => {
		checkPixStatus()
	}, [pixPayload])

	useEffect(() => {
		setScreenView(`PixOrder`, 'PixOrder')
	}, [])
	const copyCode = async () => {
		Eitri.clipboard.setText({
			text: pixPayload.code
		})
		await logEvent('CopyPixCode', { ...pixPayload })
	}

	const formatTime = seconds => {
		let minutes = Math.floor(seconds / 60)
		let remainingSeconds = seconds % 60
		return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
	}

	async function checkPixStatus(transactionId, paymentId) {
		try {
			if (!isMounted) return

			const result = await Vtex.checkout.getPixStatus(transactionId, paymentId)

			if (result.status === 'waiting') {
				await new Promise(resolve => setTimeout(resolve, 10000))
				await checkPixStatus(transactionId, paymentId)
			} else {
				clearCart()
				Eitri.navigation.navigate({ path: 'OrderCompleted', state: { orderId: result?.orderId } })
			}
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	// Call the function to start fetching data

	if (!pixPayload) return null

	return (
		<Window
			topInset
			bottomInset>
			<View
				display='flex'
				direction='column'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
				padding='small'
				gap='20px'>
				<View
					display='flex'
					direction='column'
					justifyContent='center'
					alignItems='center'
					gap='12px'>
					<Image
						src={pixImg}
						width='50%'
					/>
					<Text>{t('pixOrder.txtTimeRemaining')}&nbsp;{formatTime(timeOut)}</Text>
				</View>

				<View
					display='flex'
					direction='column'
					justifyContent='center'
					alignItems='center'>
					<Image
						src={pixPayload.qrCodeBase64Image}
						width='70%'
					/>
				</View>

				<View
					maxWidth='100%'
					borderRadius='small'
					padding='extra-small'
					borderColor='neutral-500'
					borderWidth='hairline'>
					<Text
						overflowWrap='break-word'
						maxWidth='100%'>
						{pixPayload.code}
					</Text>
				</View>

				<CustomButton
					borderRadius='pill'
					label={t('pixOrder.labelCopyCode')}
					onPress={copyCode}
				/>
			</View>
		</Window>
	)
}
