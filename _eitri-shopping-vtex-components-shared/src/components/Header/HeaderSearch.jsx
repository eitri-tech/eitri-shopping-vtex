export default function HeaderSearch(props) {
	const { onPress, labelSearch } = props

	return (
		<Touchable
			width='100%'
			onPress={onPress}>
			<View
				borderRadius='pill'
				backgroundColor='neutral-100'
				borderColor='neutral-300'
				borderWidth='hairline'
				display='flex'
				paddingVertical='small'
				paddingLeft='large'
				maxHeight='40px'
				alignItems='center'
				width='100%'>
				<Icon
					width={16}
					height={16}
					color='support-01'
					iconKey='search'
				/>

				<Text
					marginLeft='extra-small'
					color='neutral-500'
					fontFamily='Baloo2'
					fontSize='extra-small'
					fontWeight='bold'>
					{labelSearch || 'Procurar...'}
				</Text>
			</View>
		</Touchable>
	)
}
