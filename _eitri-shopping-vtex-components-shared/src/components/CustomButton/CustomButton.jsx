import Loading from '../Loading/Loading'

export default function CustomButton(props) {
	const { disabled, color, backgroundColor, label, onPress, isLoading, width, borderRadius, ...rest } = props

	const _onPress = () => {
		if (!disabled && onPress && typeof onPress === 'function') {
			onPress()
		}
	}

	return (
		<Touchable
			onPress={_onPress}
			display='flex'
			height='50px'
			width={width || '90vw'}
			backgroundColor={isLoading || disabled ? 'neutral-100' : backgroundColor || 'primary-700'}
			justifyContent='center'
			alignItems='center'
			borderRadius={borderRadius || 'small'}
			{...rest}>
			{isLoading ? (
				<Loading />
			) : (
				<Text
					fontWeight='bold'
					color={color || 'accent-100'}>
					{label}
				</Text>
			)}
		</Touchable>
	)
}
