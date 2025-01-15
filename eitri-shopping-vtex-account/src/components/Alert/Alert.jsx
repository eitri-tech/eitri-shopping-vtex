export default function Alert(props) {
	const { message, type, position, duration, onDismiss, show } = props

	const [visible, setVisible] = useState(true)

	useEffect(() => {
		if (!show) {
			return
		}
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
			if (typeof onDismiss === 'function') {
				onDismiss()
			}
		}, duration * 1000)

		return () => clearTimeout(timer)
	}, [duration, show])

	if (!visible || !show) {
		return null
	}

	return (
		<View
			position='fixed'
			padding='display'
			width='100%'
			bottom='0'>
			<View
				width='100%'
				display='flex'
				justifyContent='center'
				padding='small'>
				<Text
					block
					color={`${type || 'negative'}-700`}
					fontWeight='bold'>
					{message}
				</Text>
			</View>
			<View bottomInset />
		</View>
	)
}
