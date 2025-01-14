export default function HeaderText(props) {
	const { text, contentColor } = props
	return (
		<View display='flex' width={'100%'} justifyContent='center'>
			<Text
				color={contentColor}
				fontSize='extra-large'
				fontWeight={'bold'}>
				{text}
			</Text>
		</View>
	)
}
