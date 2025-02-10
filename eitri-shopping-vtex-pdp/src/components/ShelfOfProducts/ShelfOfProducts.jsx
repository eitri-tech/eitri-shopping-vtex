import { Loading } from 'eitri-shopping-vtex-components-shared'
import ProductCard from '../ProductCard/ProductCard'
import ShelfOfProductsCarousel from './components/ShelfOfProductsCarousel'
import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'

export default function ShelfOfProducts(props) {
	const { products, title, gap, paddingHorizontal, isLoading, mode, searchParams, ...rest } = props

	const { t } = useTranslation()

	const seeMore = () => {
		Eitri.navigation.navigate({ path: 'ProductCatalog', state: { params: searchParams, title: title } })
	}

	return (
		<View {...rest}>
			{title && (
				<View
					paddingHorizontal={paddingHorizontal || 'large'}
					display='flex'
					justifyContent='between'
					alignItems='center'
					marginBottom='extra-small'>
					<Text
						fontWeight='bold'
						fontSize='extra-large'>
						{isLoading ? t('shelfOfProducts.loading') : title}
					</Text>
					{searchParams && (
						<Touchable
							onPress={seeMore}
							display='flex'
							alignItems='center'
							gap={5}
							minWidth='fit-content'>
							<Text
								fontWeight='bold'
								color='primary-900'>
								{t('shelfOfProducts.seeMore')}
							</Text>
							<Icon
								iconKey='chevron-right'
								color='primary-900'
								width={18}
								height={18}
							/>
						</Touchable>
					)}
				</View>
			)}

			{mode === 'carousel' && (
				<ShelfOfProductsCarousel
					paddingHorizontal={paddingHorizontal}
					isLoading={isLoading}
					products={products}
					gap={gap}
				/>
			)}

			{mode !== 'carousel' && (
				<Stack
					direction='row'
					overflowX='scroll'
					gap={gap}
					scrollSnapType='x mandatory'>
					{gap && (
						<View
							width={gap}
							height='1px'
						/>
					)}
					{isLoading && (
						<View
							direction='row'
							display='flex'
							gap={gap}>
							<View
								width='188px'
								minHeight='288px'
								borderRadius='small'
								padding='extra-small'
								borderColor='tertiary-700'
								borderWidth='hairline'
								backgroundColor='neutral-100'>
								<View
									direction='column'
									justifyContent='center'
									borderRadius='micro'
									alignItems='center'
									padding='small'
									paddingTop='jumbo'>
									<Loading
										inline
										width='80px'
									/>
								</View>
							</View>
							<View
								width='188px'
								minHeight='288px'
								borderRadius='small'
								padding='extra-small'
								borderColor='tertiary-700'
								borderWidth='hairline'
								backgroundColor='neutral-100'>
								<View
									direction='column'
									justifyContent='center'
									borderRadius='micro'
									alignItems='center'
									padding='small'
									paddingTop='jumbo'>
									<Loading
										inline
										width='80px'
									/>
								</View>
							</View>
						</View>
					)}
					{!isLoading &&
						products &&
						products.map(product => (
							<View
								scrollSnapAlign='start'
								scrollMarginLeft={gap}>
								<ProductCard
                  product={product}
									key={product?.productId}
									width='188px'
								/>
							</View>
						))}
					{gap && (
						<View
							width={gap}
							height='1px'
						/>
					)}
				</Stack>
			)}
		</View>
	)
}
