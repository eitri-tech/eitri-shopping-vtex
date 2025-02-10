export default function BottomFixed(props) {
	const { children, ...rest } = props

	const [bottomHeight, setBottomHeight] = useState(0)

	useEffect(() => {
		loadHeaderHeight()
	}, [children])

	const waitForElement = selector => {
		return new Promise(resolve => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector))
			}

			const observer = new MutationObserver(mutations => {
				if (document.querySelector(selector)) {
					observer.disconnect()
					resolve(document.querySelector(selector))
				}
			})

			observer.observe(document.body, {
				childList: true,
				subtree: true
			})
		})
	}

	const loadHeaderHeight = async () => {
		await waitForElement('#bottom-fixed')
		const element = document.getElementById('bottom-fixed')
		if (element) {
			const bottomHeight = element.offsetHeight
			setBottomHeight(bottomHeight)
		}
	}

	return (
		<>
			<View
				elevation='low'
				id='bottom-fixed'
				position='fixed'
				bottom='0'
				left='0'
				right='0'
				zIndex='100'
				paddingBottom='large'
				paddingTop='large'
				{...rest}>
				{children}
				<View
					{...rest}
					bottomInset
				/>
			</View>
			<View
				height={bottomHeight}
				width='100%'
			/>
		</>
	)
}
