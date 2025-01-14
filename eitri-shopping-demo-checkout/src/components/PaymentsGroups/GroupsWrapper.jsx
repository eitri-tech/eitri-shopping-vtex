export default function GroupsWrapper(props) {
	const { title, icon, isChecked, children, onPress } = props

	return (
		<Touchable
			onPress={onPress}
			paddingVertical='small'
			paddingHorizontal='extra-small'
			borderWidth='hairline'
			borderColor='neutral-400'
			borderRadius='small'
			direction='column'>
			<View
				direction='column'
				width='100%'>
				<View
					direction='row'
					alignItems='center'
					justifyContent='between'
					gap={12}>
					<View
						direction='row'
						alignItems='center'
						gap={12}>
						<Radio checked={isChecked} />
						<Text fontSize='extra-small'>{title}</Text>
					</View>

					<View>{icon}</View>
				</View>
			</View>
			{children && isChecked && <View marginTop='large'>{children}</View>}
		</Touchable>
	)
}
