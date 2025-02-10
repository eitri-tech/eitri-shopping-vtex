import Eitri from 'eitri-bifrost'
import { sendPageView } from '../services/trackingService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-components-shared'
import { saveCartIdOnStorage } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'
import Freight from '../components/Freight/Freight'
import Coupon from '../components/Coupon/Coupon'
import CartSummary from '../components/CartSummary/CartSummary'
import InstallmentsMsg from '../components/InstallmentsMsg/InstallmentsMsg'
import CartItemsContent from '../components/CartItemsContent/CartItemsContent'
import { setLanguage, startConfigure } from '../services/AppService'

export default function Home(props) {
	const openWithBottomBar = !!props?.location?.state?.tabIndex

	const { t, i18n } = useTranslation()
	const { cart, startCart } = useLocalShoppingCart()

	const [appIsLoading, setAppIsLoading] = useState(true)

	useEffect(() => {
		startHome()
		Eitri.navigation.setOnResumeListener(() => {
			startHome()
		})
	}, [])

	useEffect(() => {
		if (cart && cart.items.length === 0) {
			Eitri.navigation.navigate({
				path: 'EmptyCart',
				state: { showCloseButton: !openWithBottomBar },
				replace: true
			})
		}
	}, [cart])

	const startHome = async () => {
		await startConfigure()
		await loadCart()
		setLanguage(i18n)
		setAppIsLoading(false)
		sendPageView('Home')
	}

	const loadCart = async () => {
		const startParams = await Eitri.getInitializationInfos()
		if (startParams?.orderFormId) {
			await saveCartIdOnStorage(startParams?.orderFormId)
		}

		return startCart()
	}

	return (
		<Window
			bottomInset
			topInset>
			<Loading
				fullScreen
				isLoading={appIsLoading}
			/>

			<HeaderTemplate
				headerType={openWithBottomBar ? HEADER_TYPE.TEXT : HEADER_TYPE.RETURN_AND_TEXT}
				contentText={t('home.title')}
			/>

			<InstallmentsMsg />

			<CartItemsContent />

			<Freight />

			<Coupon />

			<CartSummary />
		</Window>
	)
}
