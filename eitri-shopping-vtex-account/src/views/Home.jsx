import { App } from 'eitri-shopping-vtex-shared'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-components-shared'
import iconLogout from '../assets/icons/logout.svg'
import Eitri from 'eitri-bifrost'
import CButton from '../components/CButton/CButton'
import { doLogout, getCustomerData, isLoggedIn } from '../services/CustomerService'
import { navigate, PAGES } from '../services/NavigationService'
import { sendPageView } from '../services/TrackingService'
import { useTranslation } from 'eitri-i18n'
import ProfileCardButton from '../components/ProfileCardButton/ProfileCardButton'

export default function Home(props) {

  const PAGE = 'Minha Conta'

	const [isLoading, setIsLoading] = useState(true)
	const [customerData, setCustomerData] = useState(props.customerData || {})
	const { t } = useTranslation()

	useEffect(() => {
		const init = async () => {
			await App.tryAutoConfigure({ verbose: false, gaVerbose: true })

			const initialInfos = await Eitri.getInitializationInfos()

			if (initialInfos?.action === 'RequestLogin') {
				navigate(PAGES.SIGNIN, { closeAppAfterLogin: true }, true)
				return
			}

			const isLogged = await isLoggedIn()

			if (!isLogged) {
				navigate(PAGES.SIGNIN, { redirectTo: 'Home' }, true)
				return
			}

			await loadMe()

			setIsLoading(false)

			sendPageView(PAGE)
		}
		init()
	}, [])

	const loadMe = async () => {
		const customerData = await getCustomerData()
		setCustomerData(customerData)
	}

	const _doLogout = async () => {
		setIsLoading(true)
		await doLogout()
		navigate(PAGES.SIGNIN, { redirectTo: 'Home' }, true)
		setIsLoading(false)
	}

	return (
		<Window
			bottomInset
			topInset
      title={PAGE}>
			<Loading
				fullScreen
				isLoading={isLoading}
			/>

			<HeaderTemplate
				headerType={HEADER_TYPE.TEXT}
				contentText='Minha conta'
			/>

			<View padding='large'>
				<View
					borderRadius='micro'
					display='flex'
					gap={12}
					alignItems='center'
					elevation='low'
					padding='large'>
					<View
						display='flex'
						alignItems='center'
						justifyContent='center'
						width={50}
						height={50}
						padding='pill'
						borderRadius='circular'
						backgroundColor='primary-500'>
						<Text
							fontSize='huge'
							color='primary-500'
							contentColor>
							{(customerData?.firstName ?? customerData?.email)?.charAt(0)?.toLocaleUpperCase()}
						</Text>
					</View>

					<View
						display='flex'
						direction='column'
						gap={2}>
						{customerData?.firstName && (
							<Text
								fontWeight='bold'
								fontSize='small'>
								{`${customerData.firstName} ${customerData.lastName}`}
							</Text>
						)}

						{customerData?.email && <Text fontSize='small'>{customerData.email}</Text>}
					</View>
				</View>
			</View>

			<View
				padding='large'
				direction='column'
				gap={12}>
				<Text
					fontWeight='bold'
					fontSize='large'>
					Dados pessoais
				</Text>

				<ProfileCardButton
					label={t('home.labelMyAccount')}
					icon={'user'}
					onPress={() => navigate(PAGES.EDIT_PROFILE, { customerData })}
				/>

				<ProfileCardButton
					label={t('home.labelMyFavorites')}
					icon={'bookmark'}
					onPress={() => navigate(PAGES.WISH_LIST)}
				/>
			</View>

			<View
				padding='large'
				direction='column'
				gap={12}>
				<Text
					fontWeight='bold'
					fontSize='large'>
					Pedidos
				</Text>

				<ProfileCardButton
					label={t('home.labelMyOrders')}
					icon={'package'}
					onPress={() => navigate(PAGES.ORDER_LIST)}
				/>
			</View>

			<View padding='large'>
				<View marginTop='display'>
					<CButton
						variant='outlined'
						label={t('home.labelLeave')}
						iconKey='log-out'
						icon={iconLogout}
						iconPosition='right'
						iconJustify='between'
						backgroundColor='primary-700'
						color='primary-700'
						onPress={_doLogout}
					/>
				</View>
			</View>
		</Window>
	)
}
