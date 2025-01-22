export default function SimpleList(props) {
	const { currentShelf, chooseCategory } = props

	const totalLength = currentShelf?.content?.length

	const half = totalLength % 2 === 0 ? totalLength / 2 : (totalLength + 1) / 2

	return (
		<View
			paddingHorizontal={'large'}
			gap={24}
			display='flex'>
			<View width='50%'>
				{currentShelf?.content?.slice(0, half).map(category => (
					<Touchable
						key={category.title}
						onPress={() => chooseCategory(category)}
						borderBottomWidth='hairline'
						paddingVertical='nano'
						borderColor='neutral-300'
						width='100%'>
						<Text
							fontFamily='Baloo 2'
							fontSize='extra-small'
							fontWeight='medium'>
							{category?.title}
						</Text>
					</Touchable>
				))}
			</View>
			<View width='50%'>
				{currentShelf?.content?.slice(half, totalLength).map(category => (
					<Touchable
						key={category.title}
						onPress={() => chooseCategory(category)}
						borderBottomWidth='hairline'
						paddingVertical='nano'
						borderColor='neutral-300'
						width='100%'>
						<Text
							fontFamily='Baloo 2'
							fontSize='extra-small'
							fontWeight='medium'>
							{category?.title}
						</Text>
					</Touchable>
				))}
			</View>
		</View>
	)
}
