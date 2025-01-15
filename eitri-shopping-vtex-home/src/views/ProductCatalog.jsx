/*prettier-ignore*/
import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-demo-shared'

import {
	getPossibleByFacets,
	getProductsByFacets,
	getProductsByLagacySearch,
	mountLegacyPath
} from '../services/ProductService'
import SearchResults from '../components/PageSearchComponents/SearchResults'
import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'
import FacetsModal from '../components/FacetsModal/FacetsModal'

export default function ProductCatalog(props) {
	const [scrollEnded, setScrollEnded] = useState(false)

	const [initialLoading, setInitialLoading] = useState(true)
	const [productLoading, setProductLoading] = useState(false)
	const [facetsLoading, setFacetsLoading] = useState(false)

	const [windowFilter, setWindowFilter] = useState(false)

	const [products, setProducts] = useState([])
	const [filterFacets, setFilterFacets] = useState(null)
	const [initialFilters, setInitialFilters] = useState(null)
	const [hasFilters, setHasFilters] = useState(false)

	const [appliedFacets, setAppliedFacets] = useState([]) // Filtros efetivamente usados na busca
	const [currentPage, setCurrentPage] = useState(1)
	const [currencyProps, setCurrencyProps] = useState({})

	const [pagesHasEnded, setPageHasEnded] = useState(false)

	const [viewBackButton, setViewBackButton] = useState(true)

	const { t } = useTranslation()

	const legacySearch = Vtex?.configs?.searchOptions?.legacySearch

	useEffect(() => {
		if (props?.location?.state?.backButton) {
			setViewBackButton(JSON.parse(props?.location?.state?.backButton))
		}

		configLanguage()

		if (legacySearch) {
			setLegacySearchAndGetProducts().catch(e => {
				console.error('setLegacySearchAndGetProducts', e)
			})
		} else {
			setSearchAndGetProducts()
		}
	}, [])

	useEffect(() => {
		Eitri.eventBus.subscribe({
			channel: 'onUserTappedActiveTab',
			callback: _ => {
				Eitri.navigation.back()
			}
		})
		const handleScroll = () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
				setScrollEnded(true)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (!productLoading && scrollEnded && !pagesHasEnded) {
			const newPage = currentPage + 1
			setCurrentPage(newPage)
			getProducts(appliedFacets, newPage)
		}
		setScrollEnded(false)
	}, [scrollEnded])

	const getProducts = async (appliedFacets, newPage) => {
		if (legacySearch) {
			getProductsByLegacySearch(appliedFacets, newPage)
		} else {
			_getProductsByFacets(appliedFacets, newPage)
		}
	}

	const setSearchAndGetProducts = async () => {
		let params = props?.location?.state?.facets
			? parsePropsParams(props?.location?.state?.facets)
			: props?.location?.state?.params

		params.sort = parseSortString(params.sort)

		setAppliedFacets(params)
		setInitialFilters(params)

		await _getProductsByFacets(params, currentPage)
		loadFacetsOptions(params)

		setInitialLoading(false)
	}

	const setLegacySearchAndGetProducts = async () => {
		const facets = props?.location?.state?.params?.facets || props?.location?.state?.facets
		const sort = props?.location?.state?.params?.sort || props?.location?.state?.sort
		const numberOfItems =
			props?.location?.state?.params?.numberOfItems || props?.location?.state?.numberOfItems || 8
		setAppliedFacets({ facets, sort, numberOfItems })
		setCurrentPage(1)

		let path
		try {
			// console.log('facets, numberOfItems, 1, sort', facets, numberOfItems, 1, sort)
			path = mountLegacyPath(facets, numberOfItems, 1, sort)
		} catch (e) {
			console.error('executeLegacyProductSearch, path: ', e)
		}

		try {
			// console.log('path', path)
			const result = await getProductsByLagacySearch(path, 1)
			setProducts(result)
		} catch (e) {
			console.error('executeLegacyProductSearch: ', e)
		}

		setInitialLoading(false)
	}

	const getProductsByLegacySearch = async (options, page) => {
		if (productLoading || pagesHasEnded) return
		setProductLoading(true)

		let path
		try {
			path = mountLegacyPath(options.facets, options.numberOfItems, page, options.sort)
		} catch (e) {
			console.error('executeLegacyProductSearch, path: ', e)
		}

		try {
			const result = await getProductsByLagacySearch(path, page)

			if (result.length === 0) {
				setProductLoading(false)
				setPageHasEnded(true)
				return
			}

			setProducts(prev => [...prev, ...result])
		} catch (e) {
			console.error('executeLegacyProductSearch: ', e)
		}

		setProductLoading(false)
	}

	const configLanguage = async () => {
		const remoteConfig = await Eitri.environment.getRemoteConfigs()
		const locale = remoteConfig?.storePreferences?.locale || 'pt-BR'
		const currency = remoteConfig?.storePreferences?.currencyCode || 'BRL'
		setCurrencyProps({ locale, currency })
	}

	const parsePropsParams = input => {
		if (!input) return {}

		const segments = input.split('/')
		const result = []

		for (let i = 0; i < segments.length; i += 2) {
			const key = segments[i]
			const value = segments[i + 1]
			result.push({ key: key, value: value })
		}

		return { facets: result }
	}

	const loadFacetsOptions = async selectedFacets => {
		setFacetsLoading(true)
		const facetsPath = selectedFacets?.facets?.map(facet => `${facet.key}/${facet.value}`).join('/')
		const facets = await getPossibleByFacets(facetsPath, {
			query: selectedFacets?.query || selectedFacets?.q || ''
		})

		setFilterFacets(generateFilters(facets))
		setFacetsLoading(false)
	}

	const _getProductsByFacets = async (selectedFacets, page) => {
		if (productLoading || pagesHasEnded) return

		setProductLoading(true)

		const facetsPath = selectedFacets?.facets?.map(facet => `${facet.key}/${facet.value}`).join('/')

		const result = await getProductsByFacets(facetsPath, {
			sort: selectedFacets.sort,
			query: selectedFacets?.query || selectedFacets?.q || '',
			page: page
		})
		if (result.products.length === 0) {
			setProductLoading(false)
			setPageHasEnded(true)
			return
		}
		setProducts(prev => [...prev, ...result.products])
		setProductLoading(false)
	}

	const parseSortString = sort => {
		if (sort?.indexOf(':') > -1) return sort
		switch (sort) {
			case 'OrderByTopSaleDESC':
				return 'orders:desc'
			case 'OrderByReleaseDateDESC':
				return 'release:desc'
			case 'OrderByBestDiscountDESC':
				return 'discount:desc'
			case 'OrderByPriceDESC':
				return 'price:desc'
			case 'OrderByPriceASC':
				return 'price:asc'
			case 'OrderByNameASC':
				return 'name:asc'
			case 'OrderByNameDESC':
				return 'name:desc'
			case 'OrderByScoreDESC':
				return 'score:desc'
			default:
				return 'orders:desc'
		}
	}

	const handleFilterModal = () => {
		setWindowFilter(true)
	}

	const goToSearch = () => {
		Eitri.navigation.navigate({ path: 'Search' })
	}

	// TODO internacionalizar valor financeiro
	const generateFilters = facetQueryResult => {
		return facetQueryResult.facets
			.filter(facet => !facet.hidden)
			.map(facet => {
				if (facet.type === 'PRICERANGE') {
					return {
						...facet,
						values: facet.values.map(value => {
							return {
								...value,
								name: `De ${value?.range?.from?.toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL'
								})} à ${value.range.to.toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL'
								})}`,
								value: `${value.range.from}:${value.range.to}`
							}
						})
					}
				} else {
					return facet
				}
			})
	}

	const filterProductsSubmit = async filters => {
		setCurrentPage(1)
		setProducts(_ => [])
		setWindowFilter(false)
		setPageHasEnded(false)
		setHasFilters(JSON.stringify(initialFilters?.facets) !== JSON.stringify(filters?.facets))
		_getProductsByFacets(filters, 1)
	}

	return (
		<Window
			topInset
			bottomInset>
			<>
				<HeaderTemplate
					headerType={HEADER_TYPE.RETURN_TEXT_FILTER_AND_SEARCH_ICON}
					scrollEffect={true}
					viewBackButton={viewBackButton}
					contentText={props?.location?.state?.title || t('productCatalog.title')}
					filterFacets={filterFacets}
					handleFilterModal={handleFilterModal}
					navigateToSearch={goToSearch}
					searchResults={products}
					hasFilters={hasFilters}
				/>

				{initialLoading ? (
					<View
						padding={'large'}
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Loading />
					</View>
				) : (
					<View padding={'large'}>
						<SearchResults
							searchResults={products}
							isLoading={productLoading}
							locale={currencyProps.locale}
							currency={currencyProps.currency}
						/>
					</View>
				)}
			</>

			{windowFilter && (
				<FacetsModal
					initialFilters={initialFilters}
					onReady={() => setFacetsModalReady(true)}
					onApplyFilters={filterProductsSubmit}
					show={windowFilter}
					onClose={() => setWindowFilter(false)}
				/>
			)}
		</Window>
	)
}
