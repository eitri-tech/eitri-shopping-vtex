import { useLocalShoppingCart } from '../providers/LocalCart'
import { crash, crashLog, startTrackingService } from '../services/trackingService'
import Eitri from 'eitri-bifrost'
import { App } from 'eitri-shopping-vtex-shared'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-demo-shared'
import { saveCartIdOnStorage } from '../services/cartService'
import { useTranslation } from 'eitri-i18n'

export default function Home() {
	const { startCart } = useLocalShoppingCart()

	const { t, i18n } = useTranslation()

	useEffect(() => {
		startHome()
		startTrackingService()
	}, [])

	const startHome = async () => {
		await loadConfigs()
		loadCart()
	}

	const loadCart = async () => {
		const startParams = await Eitri.getInitializationInfos()

		if (startParams?.orderFormId) {
			await saveCartIdOnStorage(startParams?.orderFormId)
		}

		const cart = await startCart()

		if (cart && cart?.items?.length > 0) {
			if (
				!cart.clientProfileData ||
				!cart.clientProfileData?.email ||
				!cart.clientProfileData?.firstName ||
				!cart.clientProfileData?.lastName ||
				!cart.clientProfileData?.document ||
				!cart.clientProfileData?.phone
			) {
				Eitri.navigation.navigate({ path: 'PersonalData', state: { cart: cart }, replace: true })
			} else {
				Eitri.navigation.navigate({ path: 'FinishCart', replace: true })
			}
		} else {
			Eitri.navigation.navigate({ path: 'EmptyCart', replace: true })
		}
	}

	const loadConfigs = async () => {
		try {
			await App.tryAutoConfigure({ verbose: false })
			const remoteConfig = await Eitri.environment.getRemoteConfigs()
			const lang = remoteConfig?.storePreferences?.locale || 'pt-BR'
			i18n.changeLanguage(lang)
		} catch (e) {
			crashLog('Erro ao buscar configurações', e)
			crash()
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
