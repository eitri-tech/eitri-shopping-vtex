import { Spacing } from 'eitri-shopping-vtex-components-shared'
import ProductCard from "../ProductCard/ProductCard";

export default function ProductCarousel(props) {
	const [currentSlide, setCurrentSlide] = useState(0)

	const {
		products,
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


	return (
		<View>
			<Carousel beforeChange={beforeChange}>
				{pairItems(products).map((group, index) => (
					<View
						key={index}
						display='flex'
						direction='row'
						width='100%'
						justifyContent='between'
						padding='small'
            gap='10px'
						alignItems='center'>
						{group.map((product) => (
								<ProductCard
									key={product?.productId}
									product={product}
								/>
							)
						)}
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
