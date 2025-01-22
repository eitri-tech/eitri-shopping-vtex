import { getProductsByFacets } from '../../../services/ProductService'
import ShelfOfProducts from '../../ShelfOfProducts/ShelfOfProducts'

export default function ProductTiles(props) {
	const { data } = props

	const [shelves, setShelves] = useState([])
	const [currentShelf, setCurrentShelf] = useState({})
	const [currentProducts, setCurrentProducts] = useState([])
	const [isLoadingProducts, setIsLoadingProducts] = useState(false)

	const [cachedProducts, setCachedProducts] = useState({})

	useEffect(() => {
		if (data?.shelfs) {
			setShelves(data.shelfs)
			setCurrentShelf(data.shelfs[0])
		}
	}, [data])

	useEffect(() => {
		executeProductSearch(currentShelf)
	}, [currentShelf])

	const executeProductSearch = async shelf => {
		if (cachedProducts[shelf.title]) {
			setCurrentProducts(cachedProducts[shelf.title])
			return
		}

		setIsLoadingProducts(true)
		const processedFacets = processFacets(shelf)
		const processedSort = processSort(shelf)
		const processedPagination = processPagination(shelf)
		const result = await getProductsByFacets(processedFacets, { ...processedSort, ...processedPagination })
		setCurrentProducts(result.products)
		setCachedProducts({
			...cachedProducts,
			[shelf.title]: result.products
		})
		setIsLoadingProducts(false)
	}

	const processFacets = shelf => {
		return shelf.selectedFacets?.reduce((acc, facet) => {
			acc += `/${facet.key}/${facet.value}`
			return acc
		}, '')
	}

	const processSort = shelf => {
		if (!shelf?.sort) return {}
		return { sort: shelf?.sort?.replace('_', ':') }
	}

	const processPagination = shelf => {
		const { numberOfItems } = shelf
		return { count: numberOfItems || 8 }
	}

	const onChooseShelf = shelf => {
		setCurrentShelf(structuredClone(shelf))
	}

	return (
		<View>
			{data?.title && (
				<View
					paddingHorizontal={'large'}
					marginBottom='extra-small'>
					<Text
						fontWeight='bold'
						fontSize='extra-large'>
						{data?.title}
					</Text>
				</View>
			)}
			<View
				overflowX='auto'
				display='flex'
				paddingHorizontal={'large'}
				gap='8px'>
				{shelves?.map(shelf => (
					<Touchable
						key={shelf.title}
						paddingHorizontal='display'
						paddingVertical='nano'
						borderWidth='hairline'
						borderRadius='pill'
            minWidth="fit-content"
						onPress={() => onChooseShelf(shelf)}
						borderColor={shelf.title === currentShelf.title ? 'secondary-500' : 'neutral-300'}>
						<Text
							color={shelf.title === currentShelf.title ? 'secondary-500' : 'neutral-300'}
							fontFamily='Baloo 2'
							fontWeight='normal'
							fontSize='extra-small'>
							{shelf.title}
						</Text>
					</Touchable>
				))}
			</View>

			<ShelfOfProducts
				marginTop='large'
				mode='carousel'
				gap='16px'
				isLoading={isLoadingProducts}
				products={currentProducts}
			/>
		</View>
	)
}
