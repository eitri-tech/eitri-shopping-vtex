import Loading from '../Loading/Loading'

export default function CustomButton(props) {
	const { disabled, color, backgroundColor, label, onPress, isLoanding, borderRadius } = props

	const _onPress = () => {
		if (!disabled && onPress && typeof onPress === 'function') {
			onPress()
		}
	}

	return (
		<Touchable onPress={_onPress}>
			<View
				display='flex'
				height='50px'
				width='90vw'
				backgroundColor={isLoanding || disabled ? 'neutral-100' : backgroundColor || 'primary-700'}
				justifyContent='center'
				alignItems='center'
				borderRadius={borderRadius || 'circular'}>
				{isLoanding ? (
					<Loading />
				) : (
					<Text
						fontWeight='bold'
						color={color || 'accent-100'}>
						{label}
					</Text>
				)}
			</View>
		</Touchable>
	)
}
