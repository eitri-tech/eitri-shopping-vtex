export default function HeaderShare(props) {
	const { handleShare, iconColor } = props

	return (
		<Touchable onPress={handleShare}>
			<Icon
				color={iconColor}
				iconKey='share-2'
				width={24}
				height={24}
			/>
		</Touchable>
	)
}
