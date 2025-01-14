export default function CButton(props) {
	const { icon, iconPosition, label, iconJustify, iconKey, ...rest } = props

	if (icon) {
		return (
			<Touchable
				backgroundColor={props.variant === 'outlined' ? 'transparent' : props.backgroundColor || 'primary-700'}
				borderColor={props.backgroundColor || 'primary-700'}
				borderRadius='pill'
				borderWidth='hairline'
				fontSize='extra-small'
				block
				size='small'
				fontWeight='medium'
				height='40px'
				padding='display'
				paddingVertical='quark'
				color={props.color || 'primary-500'}
				onPress={props.onPress}>
				<View
					display='flex'
					gap='10px'
					width='100%'
					justifyContent={iconJustify || 'center'}
					alignItems='center'>
					{iconPosition === 'right' && label}
					{iconKey ? (
						<Icon
							color='primary-700'
							iconKey={iconKey}
							width={20}
							height={20}
						/>
					) : (
						<Image
							src={icon}
							height='20px'
						/>
					)}
					{iconPosition !== 'right' && label}
				</View>
			</Touchable>
		)
	}

	return (
		<Button
			borderRadius='pill'
			fontSize='extra-small'
			block
			fontWeight='medium'
			label={label}
			{...rest}
		/>
	)
}
