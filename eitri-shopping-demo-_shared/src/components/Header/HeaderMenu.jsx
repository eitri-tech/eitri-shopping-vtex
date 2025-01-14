export default function HeaderMenu(props) {
	const { iconColor, content, showDrawer, onCloseDrawer, onPressOpenButton } = props

	const [initialTransparency, setInitialTransparency] = useState('transparent')

	// Pra tratar o flicker do drawer
	useEffect(() => {
		setTimeout(() => {
			setInitialTransparency('solid')
		}, 2000)
	}, [])

	return (
		<>
			<Touchable onPress={onPressOpenButton}>
				<Icon
					width={24}
					height={24}
					color={iconColor || 'neutral-900'}
					iconKey='menu'
				/>
			</Touchable>
			<>
				{showDrawer && (
					<Touchable
						onPress={onCloseDrawer}
						position='fixed'
						customColor='#000000'
						top='0px'
						left='0px'
						bottom='0px'
						opacity='half'
						zIndex='998'
						right='0px'
					/>
				)}
				<View
					id={'drawer-content'}
					position='absolute'
					top={0}
					width='80vw'
					height='100vh'
					minHeight='100vh'
					maxHeight='100vh'
					customColor='#ffffff'
					borderRadiusRightTop='medium'
					borderRadiusRightBottom='medium'
					zIndex='999'
					opacity={initialTransparency}
					left={showDrawer ? '0' : '-80vw'}>
					<View padding='display'>
						<View topInset />
						{content}
						<View bottomInset />
					</View>
				</View>
			</>
		</>
	)
}
