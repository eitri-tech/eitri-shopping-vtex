import Eitri from 'eitri-bifrost'
import { App, Vtex } from 'eitri-shopping-vtex-shared'
import { Loading, HeaderTemplate, HEADER_TYPE, Spacing, CustomButton, Divisor } from 'eitri-shopping-vtex-components-shared'
import { openCart } from '../services/NavigationService'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { crash, crashLog, sendViewItem, startTrackingService } from '../services/trackingService'
import { findSpecificationValue, getProductById, markLastViewedProduct } from '../services/productService'
import { addToWishlist, checkItemInWishlist, removeItemFromWishlist } from '../services/customerService'
import { useTranslation } from 'eitri-i18n'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import MainDescription from '../components/MainDescription/MainDescription'
import SkuSelector from '../components/SkuSelector/SkuSelector'
import Freight from '../components/Freight/Freight'
import RichContent from '../components/RichContent/RichContent'
import DescriptionComponent from '../components/Description/DescriptionComponent'
import Reviews from '../components/Reviews/Reviews'
import ActionButton from '../components/ActionButton/ActionButton'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'
import Image3d from '../components/Image3d/Image3d'

export default function Home(props) {
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

		product = await loadProduct(startParams)
		if (product) {
			setProduct(product)
			setCurrentSku(product.items[0])
			setIsLoading(false)
		}

		setConfigLoaded(true)

		const remoteConfig = await Eitri.environment.getRemoteConfigs()
		const lang = remoteConfig?.storePreferences?.locale || 'pt-BR'
		i18n.changeLanguage(lang)
		// setCurrencyProps({
		//   locale: lang,
		//   currency: remoteConfig?.storePreferences?.currencyCode || 'BRL'
		// })

		await loadCart(startParams)

		// await checkIfIsFavorite(product?.productId)
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
			await App.tryAutoConfigure({ verbose: false })
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
		const { inList, listId } = await checkItemInWishlist(productId)
		if (inList) {
			setItemWishlistId(listId)
		}
		setLoadingWishlist(false)
	}

	const onSkuChange = (variation, value) => {
		const productSku = product.items.find(item => item[variation][0] === value)
		setCurrentSku(productSku)
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

					<Image3d frameUrl={findSpecificationValue(product, 'imagem-360')?.[0]} />

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

						<Spacing height='20px' />

						<ActionButton currentSku={currentSku} />

						<Spacing height='20px' />

						<Freight currentSku={currentSku} />

						<RichContent product={product} />

						<DescriptionComponent product={product} />

						<Reviews />

						{configLoaded && <RelatedProducts product={product} />}
					</View>
				</View>
			)}
		</Window>
	)
}
