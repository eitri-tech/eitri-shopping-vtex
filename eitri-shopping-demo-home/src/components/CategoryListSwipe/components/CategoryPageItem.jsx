import { HeaderReturn } from 'eitri-shopping-demo-shared'

export default function CategoryPageItem(props) {
	const { item, goToItem } = props

	const [headerHeight, setHeaderHeight] = useState(0)

	useEffect(() => {
		loadHeaderHeight()
	}, [])

	const loadHeaderHeight = () => {
		const element = document.getElementById('mini-header')
		const headerHeight = element.offsetHeight
		setHeaderHeight(headerHeight)
	}

	const [showSubItems, setShowSubItems] = useState(false)

	return (
		<>
			<Touchable
				padding='large'
				display='flex'
				justifyContent='between'
				alignItems='center'
				onPress={() => setShowSubItems(true)}
				elevation='low'>
				<Text fontWeight='bold'>{item.title}</Text>
				<Icon
					iconKey='chevron-right'
					width={14}
					height={14}
				/>
			</Touchable>

			<View
				width='100vw'
				top={0}
				position={showSubItems ? 'absolute' : 'fixed'}
				left={showSubItems ? '0' : '100vw'}
				transition='left 0.2s linear'
				zIndex={9999}>
				<View>
					<View
						position='fixed'
						top={0}
						left={showSubItems ? '0' : '100vw'}
						right={0}
						backgroundColor={'background-color'}>
						<View
							topInset
							backgroundColor={'primary-700'}
						/>
						<View
							id='mini-header'
							paddingVertical='extra-small'
							gap={'24px'}
							width={'100vw'}
							paddingHorizontal='large'
							display='flex'
							alignItems='center'
							justifyContent='between'
							backgroundColor='primary-700'>
							<View
								display='flex'
								alignItems='center'
								gap={16}>
								<HeaderReturn onPress={() => setShowSubItems(false)} />
								<Text
									fontWeight='medium'
									contentColor
									color='primary-700'
									fontSize='big'>
									{item.title}
								</Text>
							</View>
						</View>
					</View>
				</View>

				<View
					backgroundColor='background-color'
					minHeight='100vh'>
					<View topInset />
					<View
						height={headerHeight}
						width='100%'
					/>
					<View
						direction='column'
						gap={12}
						padding='large'>
						{item?.subcategories?.map((subItem, index) => (
							<Touchable
								padding='large'
								display='flex'
								justifyContent='between'
								alignItems='center'
								onPress={() => goToItem(subItem)}
								elevation='low'>
								<Text fontWeight='bold'>{subItem.title}</Text>
								<Icon
									iconKey='chevron-right'
									width={14}
									height={14}
								/>
							</Touchable>
						))}
					</View>
					<View bottomInset />
				</View>
			</View>
		</>
	)
}
