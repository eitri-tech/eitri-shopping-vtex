import { useLocalShoppingCart } from '../providers/LocalCart'
import Eitri from 'eitri-bifrost'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-components-shared'
import { cartHasCustomerData, saveCartIdOnStorage } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'
import { setLanguage, startConfigure } from '../services/AppService'

export default function Home() {
	const { startCart } = useLocalShoppingCart()

	const { t, i18n } = useTranslation()

	useEffect(() => {
		loadConfigs().then(loadCart)
	}, [])

	const loadCart = async () => {
		const startParams = await Eitri.getInitializationInfos()

		if (startParams?.orderFormId) {
			await saveCartIdOnStorage(startParams?.orderFormId)
		}

		const cart = await startCart()

		handleNavigation(cart)
	}

	const handleNavigation = (cart) => {
		if (!cart || cart.items.length === 0) {
			Eitri.navigation.navigate({ path: 'EmptyCart', replace: true })
		} else if (cartHasCustomerData(cart)) {
			Eitri.navigation.navigate({ path: 'FinishCart', replace: true })
		} else {
			Eitri.navigation.navigate({ path: 'PersonalData', replace: true })
		}
	}

	const loadConfigs = async () => {
		try {
			await startConfigure()
			setLanguage(i18n)
		} catch (e) {
			console.log('Error ao buscar configurações', e)
		}
	}

	return (
		<Window bottomInset topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={true}
				contentText={t('home.title')}
			/>
			<Loading fullScreen />
		</Window>
	)
}
