export default function BlogCard(props) {
	const { postImg, post, handleClick, width, textWidth, imgHeight } = props

	const category = post?._embedded['wp:term'][0][0].name.toUpperCase()
	const author = post?._embedded?.author[0].name
	const publishedDate = new Date(post?.date).toLocaleDateString('pt-BR')

	return (
		<Touchable
			key={post.id}
			width={width || '283px'}
			marginBottom='large'
			minHeight='290px'
			onPress={handleClick}>
			<View
				elevation='low'
				display='flex'
				direction='column'
				borderRadius='medium'
				width='100%'>
				<View position='relative'>
					<View minHeight='150px'>
						<Image
							src={postImg}
							width='100%'
							height={imgHeight ? '' : '168px'}
							borderRadiusLeftTop='medium'
							borderRadiusRightTop='medium'
							alt={post.title.rendered}
						/>
					</View>
					<View
						paddingHorizontal='nano'
						paddingVertical='quark'
						backgroundColor='secondary-500'
						borderRadius='circular'
						position='absolute'
						bottom={8}
						left={16}
						width='fit-content'>
						<Text
							color='accent-100'
							fontSize='nano'>
							{category}
						</Text>
					</View>
				</View>
				<Stack
					display='flex'
					padding='large'
					direction='column'
					height='100%'>
					<Text
						marginVertical='nano'
						fontFamily='Baloo 2'
						color='support-01'
						fontSize='nano'
						marginBottom='nano'
						fontWeight='bold'>
						{post.title.rendered}
					</Text>

					<Text
						lineClamp={3}
						maxWidth={textWidth || '231px'}
						fontFamily='Baloo 2'
						color='support-01'
						fontSize='extra-small'
						marginBottom='nano'
						fontWeight='regular'>
						{post.excerpt.rendered}
					</Text>
					<Text
						fontSize='quark'
						marginTop='auto'>{`Publicado por ${author} em ${publishedDate}`}</Text>
				</Stack>
			</View>
		</Touchable>
	)
}
