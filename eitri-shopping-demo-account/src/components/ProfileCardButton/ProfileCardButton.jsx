export default function ProfileCardButton(props) {
	const { icon, label, onPress } = props

	return (
		<Touchable
			borderRadius='micro'
			elevation='low'
			width='100%'
			padding='large'
			display='flex'
			justifyContent='between'
			onPress={onPress}>
			<View
				display='flex'
				alignItems='center'>
				<Icon
					iconKey={icon}
					width={24}
					height={24}
					color='neutral-900'
				/>
				<Text
					color='neutral-900'
					fontSize='small'
					marginLeft='nano'>
					{label}
				</Text>
			</View>
			<Icon
				iconKey={'chevron-right'}
				width={24}
				height={24}
				color='neutral-900'
			/>
		</Touchable>
	)
}
