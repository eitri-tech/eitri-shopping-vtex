import Eitri from 'eitri-bifrost'
import { HEADER_TYPE, HeaderTemplate } from 'eitri-shopping-vtex-components-shared'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { getCmsContent } from '../services/CmsService'
import { normalizePath, openCart } from '../services/NavigationService'
import { startConfigure } from '../services/AppService'
import { useTranslation } from 'eitri-i18n'
import HomeSkeleton from "../components/HomeSkeleton/HomeSkeleton";
import {getMappedComponent} from "../utils/getMappedComponent";

export default function Home() {
	const { cart, startCart } = useLocalShoppingCart()

	const [cmsContent, setCmsContent] = useState(null)

	const [key, setKey] = useState(new Date().getTime())

	const { t, i18n } = useTranslation()

	useEffect(() => {
		window.scroll(0, 0)

		startHome()
		requestNotificationPermission()

		Eitri.navigation.setOnResumeListener(() => {
			startCart()
		})
	}, [])

	const requestNotificationPermission = async () => {
		try {
			let notificationPermissionStatus = await Eitri.notification.checkPermission()

			if (notificationPermissionStatus.status === 'DENIED') {
				await Eitri.notification.requestPermission()
			}
		} catch (e) {
			console.error('Erro ao solicitar permissão para notificação', e)
		}
	}

	const startHome = async () => {
		startConfigure()
			.then(resolveRedirectAndCartAndCms)
			.catch(e => {
				console.error('Error startConfigure: ', e)
			})

		Eitri.navigation.setOnResumeListener(() => {
			const currentTime = new Date().getTime()
			setKey(currentTime)
		})

		const remoteConfig = await Eitri.environment.getRemoteConfigs()
		const lang = remoteConfig?.storePreferences?.locale || 'pt-BR'
		i18n.changeLanguage(lang)
	}

	const resolveRedirectAndCartAndCms = async () => {
		const startParams = await Eitri.getInitializationInfos()
		if (startParams) {
			const openRoute = processDeepLink(startParams)
			if (openRoute) {
				Eitri.navigation.navigate({ ...openRoute })
				return
			}
		}

		loadCms()
		startCart()
	}

	const processDeepLink = startParams => {
		if (startParams?.route) {
			let { route, ...rest } = startParams
			if (rest?.searchTerm) {
				const normalizedPath = normalizePath(rest.searchTerm)
				return {
					path: route,
					replace: true,
					state: { params: normalizedPath, title: rest.title || '', ...rest }
				}
			}

			return { path: route, state: rest, replace: true }
		}

		const tabIndex = startParams?.tabIndex
		if (tabIndex || (typeof tabIndex === 'number' && tabIndex >= 0)) {
			const parsedTabIndex = parseInt(tabIndex)

			if (parsedTabIndex === 1) {
				return { replace: true, path: '/Categories' }
			}

			if (parsedTabIndex === 2) {
				// TODO: Navigate to cart
			}

			if (parsedTabIndex === 3) {
				return {
					replace: true,
					path: '/LandingPage',
					state: { landingPageName: t('home.offers') }
				}
			}

			if (parsedTabIndex === 4) {
				return {
					replace: true,
					path: '/LandingPage',
					state: { landingPageName: t('home.offers') }
				}
			}
		}
	}

	const loadCms = async () => {
		const { sections } = await getCmsContent( 'home', 'home')
		setCmsContent(sections)
	}

	const navigateCart = () => {
		openCart(cart)
	}

	const navigateToSearch = () => {
		Eitri.navigation.navigate({ path: 'Search' })
	}

	return (
		<Window
			topInset
			bottomInset>

			<HeaderTemplate
				headerType={HEADER_TYPE.LOGO_SEARCH_AND_CART}
				scrollEffect={true}
				navigateToSearch={() => navigateToSearch()}
				navigateToCart={navigateCart}
				quantityOfItems={cart?.items?.length || 0}
			/>

      <HomeSkeleton show={!cmsContent} />

      <View
        paddingBottom='large'
        paddingTop='small'
        direction='column'
        gap={22}>
        {cmsContent?.map(content => getMappedComponent(content, key))}
      </View>
		</Window>
	)
}
