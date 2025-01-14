import Eitri from 'eitri-bifrost'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-demo-shared'
import userIcon from '../../assets/icons/user.svg'
import CInput from '../../components/CInput/CInput'
import CButton from '../../components/CButton/CButton'
import CCheckbox from '../../components/CCheckbox/CCheckbox'
import { sendPageView } from '../../services/TrackingService'
import { getStorePreferences } from '../../services/StoreService'
import { getSavedUser, loginWithEmailAndKey, sendAccessKeyByEmail } from '../../services/CustomerService'
import { navigate, PAGES } from '../../services/NavigationService'

export default function SignUp(props) {
	const [storeConfig, setStoreConfig] = useState(false)
	const [termsChecked, setTermsChecked] = useState(false)
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [showLoginErrorAlert, setShowLoginErrorAlert] = useState(false)
	const [alertMessage, setAlertMessage] = useState('')
	const [verificationCode, setVerificationCode] = useState('')
	const [emailCodeSent, setEmailCodeSent] = useState(false)
	const [timeOutToResentEmail, setTimeOutToResentEmail] = useState(0)
	const [loadingSendingCode, setLoadingSendingCode] = useState(false)

	const TIME_TO_RESEND_EMAIL = 60	
	const resendCode = timeOutToResentEmail > 0

	const sendAccessKey = async () => {
		if (termsChecked) {
			try {
				if (timeOutToResentEmail > 0) {
					return
				}
				setLoadingSendingCode(true)
				await sendAccessKeyByEmail(email)
				setEmailCodeSent(true)
				setTimeOutToResentEmail(TIME_TO_RESEND_EMAIL)
				setLoadingSendingCode(false)
			} catch (e) {
				console.log('erro ao enviar email', e)
				setAlertMessage('Erro ao enviar email')
				setShowLoginErrorAlert(true)
				setEmailCodeSent(false)
				setTimeOutToResentEmail(0)
				setLoadingSendingCode(false)
			}
		} else {
			setAlertMessage('Necessário aceitar os termos')
			setShowLoginErrorAlert(true)
		}
		
	}

	const loginWithEmailAndAccessKey = async () => {
		const loggedIn = await loginWithEmailAndKey(email, verificationCode).catch(e => {
			const status = e?.response?.status || 400
			if (status >= 500) return 'ServerError'
			return 'ExpiredCredentials'
		})
		
		if (loggedIn === 'WrongCredentials') {
			setAlertMessage('Token incorreto')
			setShowLoginErrorAlert(true)
		} else if (loggedIn === 'ServerError') {
			setAlertMessage('Ocorreu uma falha no serviço, tente novamente')
			setShowLoginErrorAlert(true)
		} else if (loggedIn === 'Success') {
			navigate(PAGES.HOME)
		} else {
			setAlertMessage('Verifique as informaçoes e tente novamente')
			setShowLoginErrorAlert(true)
		}
	}

	const back = () => {
		Eitri.navigation.back()
	}

	useEffect(() => {
		getStorePreferences().then(conf => {
			setStoreConfig(conf)
		})
		const loadSavedUser = async () => {
			const user = await getSavedUser()
			if (user && user.email) {
				setEmail(user.email)
			}
		}

		loadSavedUser()
		sendPageView('SignUp')
	}, [])

	useEffect(() => {
		if (timeOutToResentEmail > 0) {
			setTimeout(() => {
				setTimeOutToResentEmail(prevState => prevState - 1)
			}, 1000)
		}
	}, [timeOutToResentEmail])

	return (
		<Window topInset>
			<Loading
				isLoading={loading}
				fullScreen={true}
			/>

			<HeaderTemplate
				headerType={HEADER_TYPE.TEXT}
				contentText={'Registrar'}
			/>

			<View padding='giant'>
				<Text
					block
					fontWeight='bold'
					fontSize='huge'>
					Acessar com o seu email
				</Text>

				<View marginTop='display'>
					<CInput
						icon={userIcon}
						value={email}
						type='email'
						placeholder='Email'
						onChange={value => {
							setEmail(value)
						}}
						showClearInput={false}
						required={true}
					/>

					<View marginTop='large'>
						<CCheckbox
							label={`Ao clicar em Registrar você concorda com os termos de serviço${storeConfig?.displayCompanyName ? ' ' + storeConfig?.displayCompanyName : ''}.`}
							checked={termsChecked}
							onChange={setTermsChecked}
						/>
					</View>

					{emailCodeSent && (
						<>
							<View marginTop='large'>
								<CInput
									label={'Código de verificação'}
									placeholder='Código de verificação'
									inputMode='numeric'
									value={verificationCode}
									onChange={text => setVerificationCode(text)}
									height='45px'
								/>
							</View>

							<View marginTop='large'>
								<CButton
									backgroundColor={!email || !verificationCode ? '' : 'secondary-300'}
									borderColor={!email || !verificationCode ? '' : 'secondary-300'}
									label='Login'
									onPress={loginWithEmailAndAccessKey}
									disabled={!email || !verificationCode}
								/>
							</View>
						</>
					)}

					<View marginTop='large'>
						<CButton
							backgroundColor={
								!resendCode || !email || loadingSendingCode ? 'secondary-300' : ''
							}
							borderColor={
								!resendCode || !email || loadingSendingCode ? 'secondary-300' : ''
							}
							color={(emailCodeSent && resendCode) ? 'neutral-500' : 'accent-100'}
							label={
								!emailCodeSent
									? `Enviar código`
									: `Reenviar código${resendCode ? ` (${timeOutToResentEmail})` : ''
									}`
							}
							disabled={resendCode || !email || loadingSendingCode}
							onPress={sendAccessKey}
						/>
					</View>

					<View marginTop='large'>
						<CButton
							borderColor='secondary-300'
							color='secondary-300'
							variant='outlined'
							label='Voltar'
							onPress={() => back()}
						/>
					</View>
				</View>
			</View>

			<Alert
				type='negative'
				show={showLoginErrorAlert}
				onDismiss={() => setShowLoginErrorAlert(false)}
				duration={7}
				message={alertMessage}
			/>
		</Window>
	)
}
