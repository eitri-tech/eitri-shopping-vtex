import Loading from '../Loading/Loading'

export default function CustomButton(props) {
	const { disabled, color, backgroundColor, variant, label, onPress, isLoading, width, borderRadius, ...rest } = props

	const _onPress = () => {
		if (!disabled && onPress && typeof onPress === 'function') {
			onPress()
		}
	}

	const _backgroundColor = (() => {
		if (variant === 'outlined') {
			return 'transparent'
		}
		return isLoading || disabled ? 'neutral-100' : backgroundColor || 'primary-700'
	})()

	const _borderColor = (() => {
		return isLoading || disabled ? 'neutral-100' : backgroundColor || 'primary-700'
	})()

	return (
		<Touchable
			onPress={_onPress}
			display='flex'
			height='48px'
			width={width || '100%'}
			maxWidth='100%'
			backgroundColor={_backgroundColor}
			justifyContent='center'
			alignItems='center'
			borderRadius={borderRadius || 'small'}
			borderWidth={variant === 'outlined' ? 'hairline' : ''}
			borderColor={_borderColor}
			{...rest}>
			{isLoading ? (
				<Loading />
			) : (
				<Text
					contentColor={variant !== 'outlined'}
					fontWeight='bold'
					color={_borderColor}>
					{label}
				</Text>
			)}
		</Touchable>
	)
}
