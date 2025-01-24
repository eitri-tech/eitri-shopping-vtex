import Eitri from 'eitri-bifrost'
import { App } from 'eitri-shopping-vtex-shared'
import { sendPageView } from '../services/trackingService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import {HEADER_TYPE, HeaderTemplate, Spacing, Loading} from 'eitri-shopping-vtex-components-shared'
import { saveCartIdOnStorage } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'
import Freight from "../components/Freight/Freight";
import Coupon from "../components/Coupon/Coupon";
import CartSummary from "../components/CartSummary/CartSummary";
import InstallmentsMsg from "../components/InstallmentsMsg/InstallmentsMsg";
import CartItemsContent from "../components/CartItemsContent/CartItemsContent";

export default function Home(props) {
	const { startCart } = useLocalShoppingCart()

	const [appIsLoading, setAppIsLoading] = useState(true)

	const { t } = useTranslation()

	useEffect(() => {
		window.scroll(0, 0)
		startHome()
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
		} catch (e) {
			console.log('Error ao buscar configurações', e)
		}
	}

	const loadCart = async () => {
		const startParams = await Eitri.getInitializationInfos()
		if (startParams?.orderFormId) {
			await saveCartIdOnStorage(startParams?.orderFormId)
		}

    return startCart()
	}

  return (
		<Window bottomInset topInset>
			<View
				minHeight='100vh'
				direction='column'>
				<HeaderTemplate
					headerType={HEADER_TYPE.RETURN_AND_TEXT}
					viewBackButton={false}
					contentText={t('home.title')}
				/>

        <Loading fullScreen isLoading={appIsLoading} />

        <View display='flex' direction='column' width='100vw'>

          <Spacing height={'10px'} />

          <InstallmentsMsg />

          <CartItemsContent />

          <Freight />

          <Coupon />

          <CartSummary />

        </View>
			</View>
		</Window>
	)
}
