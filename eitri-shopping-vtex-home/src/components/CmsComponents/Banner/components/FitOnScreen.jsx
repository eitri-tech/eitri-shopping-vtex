export default function FitOnScreen(props) {
	const { data, onPress } = props

	return (
		<View>
			{data?.mainTitle && (
				<View
					paddingHorizontal='large'
					marginBottom='extra-small'>
					<Text
						fontWeight='bold'
						fontSize='big'
						color='support-01'>
						{data.mainTitle}
					</Text>
				</View>
			)}

			<View
				display='flex'
				justifyContent='between'
				gap='8px'
				paddingHorizontal='large'
				overflow='scroll'>
				{data?.images?.map(image => (
					<Touchable
						key={image.imageUrl}
						onPress={() => onPress(image)}>
						<ImageView src={image.imageUrl} />
					</Touchable>
				))}
			</View>
		</View>
	)
}
