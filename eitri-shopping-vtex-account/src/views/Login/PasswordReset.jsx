import mailIcon from '../../assets/icons/mail-01.svg'
import CInput from '../../components/CInput/CInput'
import CButton from '../../components/CButton/CButton'
import BigTitle from '../../components/BigTitle/BigTitle'
import { sendPasswordResetCode } from '../../services/CustomerService'
import { Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-components-shared'
import Alert from '../../components/Alert/Alert'
import { sendPageView } from '../../services/TrackingService'
import { navigate, PAGES } from '../../services/NavigationService'
import { useTranslation } from 'eitri-i18n'

export default function PasswordReset(props) {
	const [username, setUsername] = useState('')
	const [loading, setLoading] = useState(false)
	const [showErrorAlert, setShowErrorAlert] = useState(false)

	const { t } = useTranslation()

	useEffect(() => {
		const email = props?.location?.state?.email
		if (email) {
			setUsername(email)
		}
		sendPageView(t('passwordReset.recoveryPass'))
	}, [])

	const goToPasswordResetCode = async () => {
		try {
			if (!username) {
				return
			}
			setLoading(true)
			await sendPasswordResetCode(username)
			navigate(PAGES.PASSWORD_RESET_CODE, { email: username })
			setLoading(false)
		} catch (e) {
			setShowErrorAlert(true)
			setLoading(false)
		}
	}

	return (
		<Window topInset>
			<Loading
				isLoading={loading}
				fullScreen={true}
			/>

			<HeaderTemplate headerType={HEADER_TYPE.TEXT} contentText={`${t('passwordReset.headerText')}`}/>

			<View padding='giant'>
				<BigTitle
					title={t('passwordReset.forgotPass')}
					withBackAction
				/>

				<View marginTop='display'>
					<CInput
						icon={mailIcon}
						placeholder={t('passwordReset.setEmail')}
						value={username}
						onChange={setUsername}
					/>
				</View>

				<View marginTop='large'>
					<Text block>{t('passwordReset.messageRecovery')}</Text>
				</View>

				<View marginTop='giant'>
					<CButton
						backgroundColor='secondary-300'
						borderColor='secondary-300'
						label={t('passwordReset.sendButton')}
						onPress={goToPasswordResetCode}
					/>
				</View>
			</View>

			<Alert
				type='negative'
				show={showErrorAlert}
				onDismiss={() => setShowErrorAlert(false)}
				duration={7}
				message={t('passwordReset.messageError')}
			/>
		</Window>
	)
}
