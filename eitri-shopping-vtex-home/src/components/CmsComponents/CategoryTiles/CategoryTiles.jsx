import { resolveNavigation } from '../../../services/NavigationService'

export default function CategoryTiles(props) {
	const { data } = props

	const onPress = content => {
		if (!content?.facets) return
		resolveNavigation(content?.facets)
	}

	return (
		<View>
			{data?.title && (
				<View
          minWidth="fit-content"
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
				display='flex'
				overflowX='scroll'
				gap={8}>
				<View
					width='8px'
					height='10px'>
					&nbsp;
				</View>
				{data?.content?.map(content => (
					<Touchable
						direction='column'
						key={content.imageUrl}
						onPress={() => onPress(content)}>
						<Image
							src={content.imageUrl}
							maxWidth={content.width}
							maxHeight={content.height}
						/>
						<Text
							marginTop='nano'
							fontFamily='Baloo 2'
							fontWeight='medium'
							fontSize='large'>
							{content.title}
						</Text>
					</Touchable>
				))}
				<View
					width='8px'
					height='10px'>
					&nbsp;
				</View>
			</View>
		</View>
	)
}
