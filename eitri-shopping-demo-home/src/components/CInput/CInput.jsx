export default function CInput(props) {
	const { icon, type, backgroundColor, mask, ...rest } = props

	return (
		<View
			backgroundColor={backgroundColor || 'neutral-100'}
			borderColor='neutral-300'
			borderWidth='hairline'
			height='40px'
			width='100%'
			display='flex'
			alignItems='center'
			color='neutral-500'
			paddingHorizontal='large'
			borderRadius='pill'>
			{icon && (
				<View>
					<Image
						src={icon}
						width='16px'
					/>
				</View>
			)}
			{mask ? (
				<MaskedInput
					borderHidden={true}
					mask={mask}
					{...rest}
				/>
			) : (
				<Input
					borderHidden={true}
					type={type || 'text'}
					{...rest}
				/>
			)}
		</View>
	)
}
