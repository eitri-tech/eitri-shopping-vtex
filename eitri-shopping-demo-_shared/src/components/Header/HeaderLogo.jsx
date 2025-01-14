export default function HeaderLogo(props) {
	const { src, height } = props

	return (
		<View
			height='100%'
			display='flex'
			alignItems='center'>
			<Image
				src={src}
				height={height || 50}
			/>
		</View>
	)
}