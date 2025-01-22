import Eitri from 'eitri-bifrost'
import { App } from 'eitri-shopping-vtex-shared'
import CartTemplate from '../components/Templates/CartTemplate'
import { crashLog, sendPageView, startTrackingService } from '../services/trackingService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import {HEADER_TYPE, HeaderTemplate, Spacing} from 'eitri-shopping-vtex-components-shared'
import { navigateToCheckout } from '../services/navigationService'
import { saveCartIdOnStorage } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'
import AlertItem from "../components/AlertItem/AlertItem";
import CartItem from "../components/CartItem/CartItem";
import Freight from "../components/Freight/Freight";
import Coupon from "../components/Coupon/Coupon";
import CartSummary from "../components/CartSummary/CartSummary";
import ModalOfferingGender from "../components/ModalOfferingGender/ModalOfferingGender";
import InstallmentsMsg from "../components/InstallmentsMsg/InstallmentsMsg";
import CartItemsContent from "../components/CartItemsContent/CartItemsContent";

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

        <View
          display='flex'
          direction='column'
          width='100vw'>
          <Spacing height={'10px'} />

         <InstallmentsMsg />

          <CartItemsContent />

          <Freight
            cart={cart}
            changeCartAddress={changeCartAddress}
            updateCartFreight={updateCartFreight}
            locale={locale}
            currency={currency}
          />

          {/*<Coupon*/}
          {/*  cart={cart}*/}
          {/*  addCoupon={addCoupon}*/}
          {/*  removeCoupon={removeCoupon}*/}
          {/*/>*/}

          {/*<CartSummary*/}
          {/*  itemsValue={itemsValue}*/}
          {/*  shipping={shipping}*/}
          {/*  discounts={discounts}*/}
          {/*  totalValue={cart.value}*/}
          {/*  goToCheckout={goToCheckout}*/}
          {/*  locale={locale}*/}
          {/*  currency={currency}*/}
          {/*/>*/}

          {/*<ModalOfferingGender*/}
          {/*  show={showModalOfferingGender}*/}
          {/*  onConfirm={addOfferingGender}*/}
          {/*  onCancel={cancelAddOfferingGender}*/}
          {/*/>*/}
        </View>

				{/*<CartTemplate*/}
				{/*	cart={cart}*/}
				{/*	iconAlert='credit-card'*/}
				{/*	cartIsLoading={cartIsLoading}*/}
				{/*	appIsLoading={appIsLoading}*/}
				{/*	onChangeQuantityItem={onChangeQuantityItem}*/}
				{/*	handleRemoveCartItem={handleRemoveCartItem}*/}
				{/*	goToCheckout={goToCheckout}*/}
				{/*	locale={currencyProps.locale}*/}
				{/*	currency={currencyProps.currency}*/}
				{/*/>*/}
			</View>
		</Window>
	)
}
