export default function HeaderLogo(props) {
	const { src, height } = props

	return (
		<View
			height={50}
			width={150}
			display='flex'
			alignItems='center'>
			<Image
				src={src}
				maxWidth='100%'
				maxHeight={'100%'}
			/>
		</View>
	)
}
