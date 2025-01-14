export default function SingleBanner(props) {
	const { data, onPress } = props
	const imagesList = data.images

	console.log('SingleBanner', data)

	return (
		<View position='relative'>
			{data.mainTitle && (
				<View
					width='100%'
					paddingHorizontal='large'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Text
						fontSize='display'
						fontWeight='bold'
						marginBottom='large'>
						{data.mainTitle}
					</Text>
				</View>
			)}
			{imagesList && imagesList[0] && (
				<Touchable
					key={imagesList[0].imageUrl}
					onPress={() => onPress(imagesList[0])}
					direction='row'
					paddingHorizontal='large'
					width='100vw'>
					<ImageView
						backgroundColor='neutral-100'
						grow={1}
						src={imagesList[0].imageUrl}
						width='100%'
						aspectRatio={data.aspectRatio ?? '4:3'}
						borderRadius='small'
					/>
				</Touchable>
			)}
		</View>
	)
}
