export default function AlertItem(props) {
	const { backgroundColor, iconAlert, textAlert } = props

	return (
		<View>
			<View
				display='flex'
				backgroundColor={backgroundColor || 'primary-100'}
				justifyContent='center'
				alignItems='center'>
				<View color={backgroundColor || 'primary-100'} contentColor>
					<Icon
						iconKey={iconAlert}
						height={20}
					/>
				</View>
				<Text
					color={backgroundColor || 'primary-100'} contentColor
					paddingLeft='nano'
					paddingVertical='nano'>
					{textAlert}
				</Text>
			</View>
		</View>
	)
}
