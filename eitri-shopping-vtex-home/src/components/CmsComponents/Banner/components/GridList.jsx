export default function FitOnScreen(props) {
	const { data, onPress } = props
	const imagesList = data?.images

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
				flexWrap='wrap'
				gap={16}
				paddingHorizontal='large'
				justifyContent='between'>
				{imagesList?.map(image => (
					<Touchable
						key={image.imageUrl}
						onPress={() => onPress(image)}
						width='calc(50% - 8px)' // Adjust for two items per row with spacing
						marginBottom={16}>
						<Image
							src={image.imageUrl}
							width='100%'
							maxHeight='auto'
							borderRadius='medium'
						/>
					</Touchable>
				))}
			</View>
		</View>
	)
}
