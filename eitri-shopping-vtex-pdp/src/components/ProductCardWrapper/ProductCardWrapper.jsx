import ProductCardVertical from '../ProductCard/ProductCardVertical'
import { useLocalShoppingCart } from '../../providers/LocalCart'
import { openProduct } from '../../services/NavigationService'
import { addToWishlist, checkItemInWishlist, removeItemFromWishlist } from '../../services/customerService'
import { formatAmount } from '../../utils/utils'
import { findSpecificationValue } from '../../services/ProductService'
import { Vtex } from 'eitri-shopping-vtex-shared'
import ProductCardFullImage from '../ProductCard/ProductCardFullImage'

export default function ProductCardWrapper(props) {
	const { vtexProduct, width, locale, currency } = props

	const { addItem, removeItem, cart } = useLocalShoppingCart()

	const [loadingCartOp, setLoadingCartOp] = useState(false)
	const [loadingWishlistOp, setLoadingWishlistOp] = useState(true)

	const [isOnWishlist, setIsOnWishlist] = useState(false)
	const [wishListId, setWishListId] = useState(null)

	const [ratingValue, setRatingValue] = useState(null)
	const [ratingsCount, setRatingsCount] = useState(null)

	useEffect(() => {
		checkItemOnWishlist()
	}, [])

	const item = vtexProduct?.items?.[0]

	const sellerDefault = item?.sellers?.find(seller => seller.sellerDefault) || item?.sellers?.[0]

	// Loaders

	const checkItemOnWishlist = async () => {
		try {
			const { inList, listId } = await checkItemInWishlist(vtexProduct.productId)
			if (inList) {
				setIsOnWishlist(true)
				setWishListId(listId)
			}
			setLoadingWishlistOp(false)
		} catch (e) {
			setLoadingWishlistOp(false)
		}
	}

	// Formatters

	const formatInstallments = seller => {
		const installments = seller?.commertialOffer.Installments

		const maxInstallments = installments?.reduce((acc, curr) => {
			return curr.NumberOfInstallments > acc.NumberOfInstallments ? curr : acc
		}, installments[0])

		if (!maxInstallments || maxInstallments?.NumberOfInstallments === 1) return ''

		return `em até ${maxInstallments?.NumberOfInstallments}x ${formatAmount(maxInstallments?.Value, locale, currency)}`
	}

	const getListPrice = () => {
		if (sellerDefault?.commertialOffer.Price === sellerDefault?.commertialOffer.ListPrice) {
			return ''
		} else {
			return formatAmount(sellerDefault?.commertialOffer.ListPrice, locale, currency)
		}
	}

	const getBadge = () => {
		const price = sellerDefault?.commertialOffer?.Price
		const listPrice = sellerDefault?.commertialOffer?.ListPrice

		if (price !== listPrice) {
			const discount = ((listPrice - price) / listPrice) * 100
			return `${discount.toFixed(0)}% off`
		} else {
			return ''
		}
	}

	// Cart

	const onAddToCart = async () => {
		setLoadingCartOp(true)
		await addItem([
			{
				id: item?.itemId,
				quantity: 1,
				seller: sellerDefault?.sellerId
			}
		])
		setLoadingCartOp(false)
	}

	const onRemoveFromCart = async () => {
		setLoadingCartOp(true)
		const index = cart?.items?.findIndex(cartItem => cartItem.id === item?.itemId)
		await removeItem(index)
		setLoadingCartOp(false)
	}

	const isItemOnCart = () => {
		return cart?.items?.some(cartItem => cartItem.id === item?.itemId)
	}

	// Wishlist

	const onAddToWishlist = async () => {
		try {
			if (!vtexProduct.productId) return
			setLoadingWishlistOp(true)
			await addToWishlist(vtexProduct.productId, item?.name, item?.itemId)
			setIsOnWishlist(true)
			setLoadingWishlistOp(false)
		} catch (error) {
			setLoadingWishlistOp(false)
		}
	}

	const onRemoveFromWishlist = async () => {
		setLoadingWishlistOp(true)
		await removeItemFromWishlist(wishListId)
		setLoadingWishlistOp(false)
		setIsOnWishlist(false)
	}

	// Navigation

	const goToProductDetail = () => {
		openProduct(vtexProduct)
	}

	if (Vtex?.configs?.appConfigs?.productCard?.style === 'fullImage') {
		return (
			<ProductCardFullImage
				showListItem={Vtex?.configs?.appConfigs?.productCard?.showListPrice ?? true}
				name={item?.nameComplete || item?.name}
				image={item?.images?.[0]?.imageUrl}
				badge={getBadge()}
				listPrice={getListPrice()}
				price={formatAmount(sellerDefault?.commertialOffer.Price, locale, currency)}
				installments={formatInstallments(sellerDefault)}
				onAddToCart={onAddToCart}
				onRemoveFromCart={onRemoveFromCart}
				loadingCartOp={loadingCartOp}
				width={width}
				onPress={goToProductDetail}
				isInCart={isItemOnCart()}
				loadingWishlistOp={loadingWishlistOp}
				isOnWishlist={isOnWishlist}
				onAddToWishlist={onAddToWishlist}
				onRemoveFromWishlist={onRemoveFromWishlist}
				ratingValue={ratingValue}
				ratingsCount={ratingsCount}
				hasImage360={findSpecificationValue(vtexProduct, 'imagem-360')}
			/>
		)
	}

	return (
		<ProductCardVertical
			name={item?.nameComplete || item?.name}
			image={item?.images?.[0]?.imageUrl}
			badge={getBadge()}
			listPrice={getListPrice()}
			price={formatAmount(sellerDefault?.commertialOffer.Price, locale, currency)}
			installments={formatInstallments(sellerDefault)}
			onAddToCart={onAddToCart}
			onRemoveFromCart={onRemoveFromCart}
			loadingCartOp={loadingCartOp}
			width={width}
			onPress={goToProductDetail}
			isInCart={isItemOnCart()}
			loadingWishlistOp={loadingWishlistOp}
			isOnWishlist={isOnWishlist}
			onAddToWishlist={onAddToWishlist}
			onRemoveFromWishlist={onRemoveFromWishlist}
			ratingValue={ratingValue}
			ratingsCount={ratingsCount}
			hasImage360={findSpecificationValue(vtexProduct, 'imagem-360')}
		/>
	)
}
