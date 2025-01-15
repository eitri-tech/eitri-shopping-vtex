export default function HeaderSearchIcon(props) {
	const { navigateToSearch, iconColor } = props

	return (
		<Touchable
			onPress={navigateToSearch}>
			<Icon
				color={iconColor}
				iconKey='search'
				width={24}
				height={24}
			/>
		</Touchable>
	)
}
