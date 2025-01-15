export default function SelectableTouchable(props) {
	const { addCategory, removeCategory, checked, value, categoryKey, name } = props

	const handleCheck = value => {
		if (checked) {
			removeCategory({ key: categoryKey, value })
		} else {
			addCategory(value)
		}
	}

	return (
		<Touchable
			gap={4}
			display='flex'
			alignItems='center'
			onPress={() => handleCheck({ key: categoryKey, value })}>
			<Checkbox checked={checked} />
			{`${name}`}
		</Touchable>
	)
}
