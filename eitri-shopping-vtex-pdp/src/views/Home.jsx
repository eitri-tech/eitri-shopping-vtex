import Eitri from 'eitri-bifrost'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading, HeaderTemplate, HEADER_TYPE, Spacing } from 'eitri-shopping-vtex-components-shared'
import { openCart } from '../services/NavigationService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { crash, crashLog, sendViewItem } from '../services/trackingService'
import { getProductById, markLastViewedProduct } from '../services/productService'
import { addToWishlist, productOnWishlist, removeItemFromWishlist } from '../services/customerService'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import MainDescription from '../components/MainDescription/MainDescription'
import SkuSelector from '../components/SkuSelector/SkuSelector'
import Freight from '../components/Freight/Freight'
import RichContent from '../components/RichContent/RichContent'
import DescriptionComponent from '../components/Description/DescriptionComponent'
import Reviews from '../components/Reviews/Reviews'
import ActionButton from '../components/ActionButton/ActionButton'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'
import { setLanguage, startConfigure } from '../services/AppService'
import { useTranslation } from 'eitri-i18n'
import BottomFixed from '../components/BottomFixed/BottomFixed'

export default function Home() {
	const { startCart, cart } = useLocalShoppingCart()
	const { i18n } = useTranslation()

	const [product, setProduct] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [configLoaded, setConfigLoaded] = useState(false)
	const [loadingWishlist, setLoadingWishlist] = useState(true)
	const [itemWishlistId, setItemWishlistId] = useState(-1)
	const [currentSku, setCurrentSku] = useState(null)

	useEffect(() => {
		window.scroll(0, 0)
		startHome()
		Eitri.navigation.setOnResumeListener(() => {
			startHome()
		})
	}, [])

	const startHome = async () => {
		setIsLoading(true)

		const startParams = await Eitri.getInitializationInfos()

		let product = await startParams.product

		if (product) {
			setProduct(product)
			setCurrentSku(product.items[0])
			setIsLoading(false)
		}

		await loadConfigs()
		setLanguage(i18n)

		product = await loadProduct(startParams)
		if (product) {
			setProduct(product)
			setCurrentSku(product.items[0])
			setIsLoading(false)
		}

		setConfigLoaded(true)

		await loadCart(startParams)

		sendViewItem(product)
		markLastViewedProduct(product)
	}

	const handleSaveFavorite = async () => {
		setLoadingWishlist(true)
		if (itemWishlistId === -1) {
			try {
				const result = await addToWishlist(product?.productId, product?.productName, product?.items[0]?.itemId)
				setItemWishlistId(result?.data?.addToList)
			} catch (e) {
				console.error('handleSaveFavorite: Error', e)
			}
		} else {
			await removeItemFromWishlist(itemWishlistId)
			setItemWishlistId(-1)
		}
		setLoadingWishlist(false)
	}

	const handleShare = async linkText => {
		const { host } = Vtex.configs
		await Eitri.share.link({
			url: `${host}/${linkText}/p`
		})
	}

	const navigateCart = () => {
		openCart(cart)
	}

	const loadProduct = async startParams => {
		try {
			if (startParams.productId) {
				const product = await getProductById(startParams.productId)
				setProduct(product)
				return product
			}
		} catch (e) {
			console.error('loadProduct: Error', e)
			return null
		}
	}

	const loadCart = async startParams => {
		if (startParams?.orderFormId) {
			await Eitri.sharedStorage.setItem('vtex_cart_key', startParams?.orderFormId)
		}
		await startCart()
	}

	const loadConfigs = async () => {
		try {
			await startConfigure()
		} catch (e) {
			crashLog('Erro ao buscar configurações', e)
			crash()
		}
	}

	const isProductInCart = productId => {
		return cart?.items?.some(productInCart => {
			return productInCart.productId === productId
		})
	}

	const checkIfIsFavorite = async productId => {
		setLoadingWishlist(true)
		const { inList, listId } = await productOnWishlist(productId)
		if (inList) {
			setItemWishlistId(listId)
		}
		setLoadingWishlist(false)
	}

	const onSkuChange = skuId => {
		const productSku = product.items.find(item => item.itemId === skuId)
		if (productSku) {
			setCurrentSku(productSku)
		}
	}

	return (
		<Window
			title='[pdp] - Home'
			bottomInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_SHARE_AND_CART}
				handleShare={() => handleShare(product?.linkText)}
				quantityOfItems={cart?.items?.length}
				navigateToCart={navigateCart}
			/>

			<Loading
				isLoading={isLoading}
				fullScreen
			/>

			{product && (
				<View>
					<ImageCarousel currentSku={currentSku} />

					<View padding='large'>
						<MainDescription
							product={product}
							currentSku={currentSku}
						/>

						<SkuSelector
							currentSku={currentSku}
							product={product}
							onSkuChange={onSkuChange}
							marginTop={'large'}
						/>

						<Freight currentSku={currentSku} />

						<RichContent product={product} />

						<DescriptionComponent marginTop='small' product={product} />

						<Reviews />

					</View>

					<View marginBottom='large'>
						{configLoaded && <RelatedProducts product={product} />}
					</View>

					<BottomFixed backgroundColor='accent-100'>
						<ActionButton currentSku={currentSku} />
					</BottomFixed>
				</View>
			)}
		</Window>
	)
}
