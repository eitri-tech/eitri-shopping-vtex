import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-components-shared'
import { getCmsContent } from '../services/CmsService'
import { getMappedComponent } from '../utils/getMappedComponent'
import Eitri from 'eitri-bifrost'
import { PROVIDER } from '../utils/Constants'
import { useTranslation } from 'eitri-i18n'

export default function Categories() {
	const [cmsContent, setCmsContent] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const { t } = useTranslation()

	useEffect(() => {
		loadCms()
	}, [])

	const loadCms = async () => {
		const { sections } = await getCmsContent({ contentType: 'categories', pageName: 'categorias' })

		if (sections && sections[0].provider === PROVIDER.DECO) {
			const _sectionToCustom = sections?.find(
				section => section?.metadata?.component === 'site/sections/Header/Header.tsx'
			)

			// Hack para tela de categorias
			_sectionToCustom.metadata.component = 'site/sections/CustomDecoCategories.tsx'
			_sectionToCustom.provider = PROVIDER.DECO
			setCmsContent([_sectionToCustom])
		} else {
			setCmsContent(sections)
		}

		setIsLoading(false)
	}

	const goToSearch = () => {
		Eitri.navigation.navigate({ path: '/Search' })
	}

	return (
		<Window
			bottomInset
			topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.TEXT_AND_SEARCH_ICON}
				contentText={t('categories.title')}
				navigateToSearch={goToSearch}
			/>
			<Loading
				fullScreen
				isLoading={isLoading}
			/>
			<View
				paddingVertical='display'
				direction='column'
				gap='32px'>
				{cmsContent?.map(content => getMappedComponent(content))}
			</View>
		</Window>
	)
}
