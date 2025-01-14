import { formatAmount } from '../../utils/utils'
import ProductCardVertical from '../ProductCard/ProductCardVertical'
import { Spacing } from 'eitri-shopping-demo-shared'
import ProductCardWrapper from '../ProductCardWrapper/ProductCardWrapper'

export default function ProductCarousel(props) {
	const [currentSlide, setCurrentSlide] = useState(0)

	const {
		products,
		reviewsRate,
		addToCart,
		isProductInCart,
		navigateCart,
		navigateToProduct,
		borderColor,
		locale,
		currency
	} = props

	let pairedItems = []

	if (!Array.isArray(products)) {
		return null
	}

	const beforeChange = (currentSlide, nextSlide) => {
		setCurrentSlide(nextSlide)
	}

	const pairItems = items => {
		pairedItems = []
		for (let i = 0; i < items.length; i += 2) {
			pairedItems.push(items.slice(i, i + 2))
		}
		return pairedItems
	}

	const getRatingInfo = productId => {
		const review = reviewsRate?.find(review => review?.product_code == productId)
		return review ? { average: review.average, count: review.count } : { average: 0, count: 0 }
	}

	const isOnCart = productId => {
		return isProductInCart(productId)
	}

	const getBadge = sellerDefault => {
		const price = sellerDefault?.commertialOffer?.Price
		const listPrice = sellerDefault?.commertialOffer?.ListPrice

		if (price !== listPrice) {
			const discount = ((listPrice - price) / listPrice) * 100
			return `${discount.toFixed(0)}% off`
		} else {
			return ''
		}
	}

	return (
		<View paddingVertical='small'>
			<Carousel beforeChange={beforeChange}>
				{pairItems(products).map((group, index) => (
					<View
						key={index}
						display='flex'
						direction='row'
						width='100%'
						justifyContent='between'
						paddingVertical='small'
						alignItems='center'>
						{group.map((item, index) => {
							const { average, count } = getRatingInfo(item?.productId)
							const isProductInCart = isOnCart(item?.productId)
							return (
								<ProductCardWrapper
									key={item?.productId}
									vtexProduct={item}
									listPrice={
										item?.items[0]?.sellers[0]?.commertialOffer?.ListPrice !==
										item?.items[0]?.sellers[0]?.commertialOffer?.Price
											? formatAmount(
													item?.items[0]?.sellers[0]?.commertialOffer?.ListPrice,
													locale,
													currency
												)
											: null
									}
									image={item?.items[0]?.images[0]?.imageUrl}
									name={item?.productName || item?.name}
									price={formatAmount(
										item?.items[0]?.sellers[0]?.commertialOffer?.Price,
										locale,
										currency
									)}
									width={'48%'}
									ratingValue={average}
									ratingsCount={count}
									onAddToCart={addToCart}
									alreadyInCart={isProductInCart}
									product={item}
									onPress={navigateCart}
									navigateToProduct={navigateToProduct}
									borderColor={borderColor}
									badge={getBadge(item?.items[0]?.sellers[0])}
								/>
							)
						})}
					</View>
				))}
			</Carousel>
			<Spacing height='10px' />
			{pairedItems?.length > 1 && (
				<View
					display='flex'
					gap='5px'
					justifyContent='center'>
					{pairedItems?.map((item, index) => {
						return (
							<View
								key={index}
								width='32px'
								height='6px'
								backgroundColor={currentSlide === index ? 'primary-700' : 'neutral-300'}
								borderRadius='pill'
							/>
						)
					})}
				</View>
			)}
		</View>
	)
}
