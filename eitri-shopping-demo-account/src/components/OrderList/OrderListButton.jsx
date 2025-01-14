export default function OrderListButton(props) {
	const { onPress, label, backgroundColor, color, borderColor } = props

	return (
		<Touchable
			borderColor={borderColor}
			borderWidth={'hairline'}
			backgroundColor={backgroundColor}
			borderRadius={'small'}
			display='flex'
			direction='row'
			justifyContent='center'
			alignItems='center'
			padding='nano'
			onPress={onPress}>
			<Text
				block
				fontWeight='medium'
				color='background-color'
				fontSize='nano'>
				{label}
			</Text>
		</Touchable>
	)
}
