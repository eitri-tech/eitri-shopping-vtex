export default function Alert(props) {
	const {message, colorMessage, backgroundColor, iconKey, colorIcon} = props

	return (
		<View
			marginTop='nano'
			backgroundColor={backgroundColor}
			borderRadius={'small'}
			display={'flex'}
			gap={'14px'}
			alignItems={'center'}
			padding={'nano'}>
			<Icon
				iconKey={iconKey}
				color={colorIcon}
				width={20}
				height={20}
			/>
			<Text color={colorMessage}>{message}</Text>
		</View>
	)
}
