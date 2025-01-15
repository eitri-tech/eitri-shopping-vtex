import Eitri from 'eitri-bifrost'
import { openCart } from '../services/NavigationService'
import { Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-demo-shared'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { getCmsContent } from '../services/CmsService'
import { getMappedComponent } from '../utils/getMappedComponent'
import { useTranslation } from 'eitri-i18n'

export default function LandingPage(props) {
	const [cmsContent, setCmsContent] = useState(null)
	const [ladingPageLogo, setLadingPageLogo] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const { t } = useTranslation()

	const loadCms = async () => {
		try {
			const landingPageName = props?.location?.state?.landingPageName
			const { sections, settings } = await getCmsContent({
				contentType: 'landingPage',
				pageName: landingPageName
			})
			setCmsContent(sections)
			setLadingPageLogo(settings?.imageLogo?.logoUrl)
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadCms()
	}, [])

	const { cart } = useLocalShoppingCart()

	const navigateCart = () => {
		openCart(cart)
	}

	const navigateToSearch = () => {
		Eitri.navigation.navigate({ path: 'Search' })
	}

	return (
		<Window
			bottomInset
			topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				contentText={props?.location?.state?.pageTitle ?? ''}
			/>

			<Loading
				fullScreen
				isLoading={isLoading}
			/>

			<View
				paddingVertical='large'
				direction='column'
				gap='32px'>
				{ladingPageLogo && (
					<View
						width='100%'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image
							src={ladingPageLogo}
							maxHeight='52px'
						/>
					</View>
				)}

				{cmsContent?.map(content => getMappedComponent(content))}
			</View>
		</Window>
	)
}
