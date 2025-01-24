import SwiperContent from '../../../SwiperContent/SwiperContent'

export default function RoundedBannerList(props) {
	const { data, onPress } = props
	const imagesList = data.images

	return (
		<View>
			{data?.mainTitle && (
				<View
					paddingHorizontal='large'
					marginBottom='extra-small'>
					<Text
						fontWeight='bold'
						fontSize='extra-large'>
						{data.mainTitle}
					</Text>
				</View>
			)}
			<SwiperContent paddingHorizontal='large'>
				{imagesList &&
					imagesList.map(slider => (
						<View
							direction='column'
							key={slider.imageUrl}
							gap={8}
							marginRight='small'
							alignItems='center'>
							<Touchable
								key={slider.imageUrl}
								display='flex'
								alignItems='center'
								justifyContent='center'
								height='100%'
								onPress={() => onPress(slider)}>
								<Image
									backgroundColor='neutral-100'
									borderRadius='pill'
									grow={1}
									src={slider.imageUrl}
									maxHeight={`${data?.size?.maxHeight}px` || ''}
									maxWidth={`${data?.size?.maxWidth}px` || ''}
								/>
							</Touchable>
							{slider?.subLabel && (
								<Text
									fontSize='quark'
									whiteSpace='nowrap'
									fontWeight='bold'
									textAlign='center'>
									{slider?.subLabel}
								</Text>
							)}
						</View>
					))}
			</SwiperContent>
		</View>
	)
}
