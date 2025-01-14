import Eitri from 'eitri-bifrost'
import { App } from 'eitri-shopping-vtex-shared'
import CartTemplate from '../components/Templates/CartTemplate'
import { crashLog, sendPageView, startTrackingService } from '../services/trackingService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { HEADER_TYPE, HeaderTemplate } from 'eitri-shopping-demo-shared'
import { navigateToCheckout } from '../services/navigationService'
import { saveCartIdOnStorage } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'

export default function Home(props) {
	const { startCart, cart, cartIsLoading, changeQuantity, removeItem } = useLocalShoppingCart()

	const [appIsLoading, setAppIsLoading] = useState(true)
	const [showBackButton, setShowBackButton] = useState(true)
	const [currencyProps, setCurrencyProps] = useState({})

	const { t, i18n } = useTranslation()

	useEffect(() => {
		window.scroll(0, 0)
		startHome()
		startTrackingService()
		Eitri.navigation.setOnResumeListener(() => {
			startHome()
		})
	}, [])

	const startHome = async () => {
		await loadConfigs()
		await loadCart()
		setAppIsLoading(false)
		sendPageView('Home')
	}

	const loadConfigs = async () => {
		try {
			await App.tryAutoConfigure({ verbose: false })

			const remoteConfig = await Eitri.environment.getRemoteConfigs()
			const lang = remoteConfig?.storePreferences?.locale || 'pt-BR'
			i18n.changeLanguage(lang)

			setCurrencyProps({
				locale: lang, 
				currency: remoteConfig?.storePreferences?.currencyCode || 'BRL'
			})
		} catch (e) {
			crashLog('Erro ao buscar configurações', e)
			crash()
		}
	}

	const loadCart = async () => {
		const startParams = await Eitri.getInitializationInfos()
		if (startParams?.orderFormId) {
			await saveCartIdOnStorage(startParams?.orderFormId)
			startCart()
		} else {
			setShowBackButton(false)
			startCart()
		}
	}

	const onChangeQuantityItem = async (quantity, index) => {
		try {
			changeQuantity(index, quantity)
		} catch (e) {
			console.log('Error onChangeQuantityItem==>', e)
		}
	}

	const handleRemoveCartItem = async index => {
		try {
			removeItem(index)
		} catch (error) {
			console.error('Cart: handleRemoveCartItem Error', error)
		}
	}

	const isValidToProceed = cart => {
		if (!cart) return false
		if (!cart?.items) return false
		if (cart?.shipping?.shippingUnavailable) return false
		return cart?.items.length !== 0
	}

	const goToCheckout = async () => {
		if (isValidToProceed(cart)) {
			navigateToCheckout(cart?.orderFormId)
		}
	}

	return (
		<Window bottomInset topInset>
			<View
				minHeight='100vh'
				direction='column'>
				<HeaderTemplate
					headerType={HEADER_TYPE.RETURN_AND_TEXT}
					viewBackButton={showBackButton}
					contentText={t('home.title')}
				/>
				<CartTemplate
					cart={cart}
					iconAlert='credit-card'
					cartIsLoading={cartIsLoading}
					appIsLoading={appIsLoading}
					onChangeQuantityItem={onChangeQuantityItem}
					handleRemoveCartItem={handleRemoveCartItem}
					goToCheckout={goToCheckout}
					locale={currencyProps.locale}
					currency={currencyProps.currency}
				/>
			</View>
		</Window>
	)
}
