export default function Tag(props) {
	const { backgroundColor, color, label } = props

	return (
		<View
			backgroundColor={backgroundColor || 'tertiary-500'}
			paddingHorizontal='small'
			paddingVertical='nano'
			borderRadius='pill'
			display='flex'
			alignItems='center'
			justifyContent='center'>
			<Text
				fontSize='small'
				color={color || 'accent-100'}
				fontWeight='bold'
				fontFamily='Baloo 2'>
				{label}
			</Text>
		</View>
	)
}
