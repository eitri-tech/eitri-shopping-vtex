import { Loading } from 'eitri-shopping-vtex-components-shared'
import ProductCardWrapper from '../ProductCardWrapper/ProductCardWrapper'
import ShelfOfProductsCarousel from './components/ShelfOfProductsCarousel'
import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'

export default function ShelfOfProducts(props) {
	const { products, title, gap, paddingHorizontal, isLoading, mode, searchParams, ...rest } = props
	const [currencyProps, setCurrencyProps] = useState({})

	const { t } = useTranslation()

	const seeMore = () => {
		Eitri.navigation.navigate({ path: 'ProductCatalog', state: { params: searchParams, title: title } })
	}

	useEffect(() => {
		configLanguage()
	}, [])

	const configLanguage = async () => {
		const remoteConfig = await Eitri.environment.getRemoteConfigs()
		const locale = remoteConfig?.storePreferences?.locale || 'pt-BR'
		const currency = remoteConfig?.storePreferences?.currencyCode || 'BRL'
		setCurrencyProps({ locale, currency })
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
					isLoading={isLoading}
					products={products}
					gap={gap}
					locale={currencyProps.locale}
					currency={currencyProps.currency}
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
								<ProductCardWrapper
									vtexProduct={product}
									key={product?.productId}
									width='188px'
									locale={currencyProps.locale}
									currency={currencyProps.currency}
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
