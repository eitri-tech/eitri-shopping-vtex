import Eitri from 'eitri-bifrost'
import SwiperContent from '../../SwiperContent/SwiperContent'

export default function CategoryShelf(props) {
	const { data } = props

	const goToCategoryPage = category => {
		Eitri.navigation.navigate({
			path: 'ProductCatalog',
			state: {
				facets: category.facets,
				title: category.title
			}
		})
	}

	if (data?.mode === 'fitOnScreen') {
		return (
			<View>
				{data?.title && (
					<View
						paddingHorizontal='large'
						marginBottom='extra-small'>
						<Text
							fontFamily='Baloo 2'
							fontWeight='bold'
							fontSize='big'
							color='support-01'>
							{data.title}
						</Text>
					</View>
				)}

				<View
					title={data.title}
					display='flex'
					justifyContent='between'
					gap='8px'
					paddingHorizontal='large'
					overflow='scroll'>
					{data?.shelves?.map(category => (
						<Touchable
							key={category.imageUrl}
							onPress={() => goToCategoryPage(category)}>
							<ImageView
								src={category.imageUrl}
								width={category.width}
								height={category.height}
							/>
						</Touchable>
					))}
				</View>
			</View>
		)
	}

	if (data?.mode === 'scroll') {
		return (
			<SwiperContent
				title={data.title}
				paddingHorizontal='large'>
				{data?.shelves?.map(category => (
					<Touchable
						key={category.imageUrl}
						onPress={() => goToCategoryPage(category)}>
						<ImageView
							src={category.imageUrl}
							width={category.width}
							height={category.height}
						/>
					</Touchable>
				))}
			</SwiperContent>
		)
	}
}
