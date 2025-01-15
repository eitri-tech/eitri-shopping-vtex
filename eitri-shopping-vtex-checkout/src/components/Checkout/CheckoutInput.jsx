export default function CheckoutInput(props) {
	const { icon, type, backgroundColor, mask, label, width, ...rest } = props

	return (
		<View width='100%'>
			{label && (
				<View marginBottom='nano'>
					<Text
						fontSize='extra-small'
						fontWeight={'bold'}>
						{label}
					</Text>
				</View>
			)}
			<View
				backgroundColor={backgroundColor || 'background-color'}
				borderColor='neutral-300'
				borderWidth='hairline'
				height='37px'
				display='flex'
				alignItems='center'
				color='neutral-500'
				paddingHorizontal='small'
				width={width || '100%'}
				borderRadius='pill'>
				{icon && (
					<View>
						<Image src={icon} />
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
						type={'text'}
						{...rest}
					/>
				)}
			</View>
		</View>
	)
}
