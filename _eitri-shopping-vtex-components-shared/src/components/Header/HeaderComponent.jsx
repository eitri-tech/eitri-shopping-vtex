import HeaderCart from './HeaderCart'
import Eitri from 'eitri-bifrost'

export default function HeaderComponent(props) {
	const {
		backgroundColor,
		contentColor,
		children,
		display,
		alignItems,
		justifyContent,
		paddingVertical,
		paddingHorizontal,
		showSearchBar,
		quantityOfItems,
		navigateToSearch,
		onPressCartSearchBar,
		scrollEffect = false,
		iconCartColor,
		filterOptions
	} = props

	const [safeAreaTop, setSafeAreaTop] = useState(0)

	const [translate, setTranslate] = useState('')

	const safeAreaTopRef = useRef()

	safeAreaTopRef.current = safeAreaTop

	let minHeight = 60

	useEffect(() => {
		loadSafeAreas()

		window.addEventListener('scroll', scrollDetect)
		return () => {
			window.removeEventListener('scroll', scrollDetect)
		}
	}, [])

	const loadSafeAreas = async () => {
		const { EITRI } = window
		if (EITRI) {
			const { superAppData } = await EITRI.miniAppConfigs
			const { safeAreaInsets } = superAppData
			const { top } = safeAreaInsets
			setSafeAreaTop(top)
		}
	}

	let ticking = false
	let lastScrollTop = window.document.documentElement.scrollTop

	let scrollDetect = () => {
		if (!ticking && scrollEffect) {
			window.requestAnimationFrame(() => {
				let currentScrollTop = window.document.documentElement.scrollTop

				if (currentScrollTop > lastScrollTop) {
					setTranslate(`translateY(-100%)`)
				} else if (currentScrollTop < lastScrollTop) {
					setTranslate('')
				}

				lastScrollTop = Math.max(currentScrollTop, 0)

				ticking = false
			})

			ticking = true
		}
	}

	if (!backgroundColor) {
		return null
	}

	return (
		<>
			<View
				backgroundColor={backgroundColor}
				id='header-container'
				position={'fixed'}
				transform={translate || ''}
				transition='all 0.3s'
				top={0}
				left={0}
				right={0}
				zIndex='999'>
				<View topInset />
				<View id='header'>
					<View
						id='header-content'
						gap='24px'
						width='100vw'
						paddingRight='extra-large'
						paddingVertical={paddingVertical || 'extra-small'}
						paddingHorizontal={paddingHorizontal || 'large'}
						display={display || 'flex'}
						alignItems={alignItems || 'center'}
						justifyContent={justifyContent || 'between'}
						minHeight={minHeight}
						backgroundColor={backgroundColor}>
						{children}
					</View>
					{showSearchBar && (
						<View
							display='flex'
							backgroundColor='neutral-100'
							padding='large'
							width='100%'
							alignItems='center'>
							<Touchable
								grow={1}
								onPress={navigateToSearch}>
								<View
									borderRadius='pill'
									backgroundColor='background-color'
									borderColor='neutral-300'
									display='flex'
									paddingVertical='small'
									paddingLeft='large'
									maxHeight='40px'
									alignItems='center'
									width='100%'>
									<Icon
										width={16}
										height={16}
										color={contentColor || 'support-01'}
										iconKey='search'
									/>
									<Text
										marginLeft='extra-small'
										color='neutral-500'
										fontFamily='Baloo2'
										fontSize='extra-small'
										fontWeight='bold'>
										Procurar...
									</Text>
								</View>
							</Touchable>
							<View
								id='cart-icon'
								opacity='none'
								justifyContent='end'
								display='flex'
								width={0}>
								<HeaderCart
									iconColor={iconCartColor}
									quantityOfItems={quantityOfItems}
									onPress={onPressCartSearchBar}
								/>
							</View>
						</View>
					)}
				</View>
			</View>
			<View
				topInset
				position='fixed'
				width='100%'
				top={0}
				zIndex={2000}
				backgroundColor={backgroundColor}
			/>
			<View height={minHeight} />
		</>
	)
}
