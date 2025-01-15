export default function CollapsableView(props) {
	const { children, title, willStartCollapsed } = props
	const [collapsed, setCollapsed] = useState(willStartCollapsed)

	useEffect(() => {
		setCollapsed(!!willStartCollapsed)
	}, [])

	const toggleCollapsedState = () => {
		setCollapsed(!collapsed)
	}

	return (
		<View
			borderTopWidth={'hairline'}
			borderColor='neutral-500'
			padding='small'>
			<Touchable
				display='flex'
				direction='row'
				justifyContent='between'
				alignItems='center'
				onPress={toggleCollapsedState}>
				<Text
					fontSize='large'
					fontWeight={'medium'}>
					{title}
				</Text>

				<Icon
					iconKey={collapsed ? 'chevron-down' : 'chevron-up'}
					width={24}
				/>
			</Touchable>
			{!collapsed && <View marginVertical='small'>{children}</View>}
		</View>
	)
}
