export default function SwiperContent(props) {
	const { title, children, marginBottom, paddingHorizontal, gap } = props

	return (
		<View marginBottom={marginBottom || ''}>
			{title && (
				<View
					paddingHorizontal={paddingHorizontal || 'large'}
					marginBottom='extra-small'>
					<Text
						fontWeight='bold'
						fontSize='big'
						color='support-01'>
						{title}
					</Text>
				</View>
			)}
			<Stack
				direction='row'
				overflowX='scroll'
				scrollSnapType='x mandatory'>
				{paddingHorizontal && (
					<View
						marginLeft={paddingHorizontal}
						height='1px'>
						&nbsp;
					</View>
				)}
				<View
					direction='row'
					gap={gap ? gap : '8px'} minHeight="72px">
					{children}
				</View>
				{paddingHorizontal && (
					<View
						marginRight={paddingHorizontal}
						height='1px'>
						&nbsp;
					</View>
				)}
			</Stack>
		</View>
	)
}
