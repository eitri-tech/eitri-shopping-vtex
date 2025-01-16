import lockIcon from '../../assets/icons/lock.svg'
import CButton from '../../components/CButton/CButton'
import CInput from '../../components/CInput/CInput'
import BigTitle from '../../components/BigTitle/BigTitle'
import { Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-components-shared'
import { setPassword } from '../../services/CustomerService'
import Alert from '../../components/Alert/Alert'
import { navigate, PAGES } from '../../services/NavigationService'
import { useTranslation } from 'eitri-i18n'

export default function PasswordResetNewPass(props) {
	const email = props?.location?.state?.email
	const recoveryCode = props?.location?.state?.recoveryCode

	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [showErrorAlert, setShowErrorAlert] = useState(false)

	const { t } = useTranslation()

	const confirmNewPassword = async () => {
		try {
			if (!email || !recoveryCode || !newPassword) {
				return
			}
			setLoading(true)
			await setPassword(email, recoveryCode, newPassword)
			navigate(PAGES.HOME)
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

			<HeaderTemplate
				headerType={HEADER_TYPE.TEXT}
				contentText={`${t('passwordResetNewPass.headerText')}`}
			/>

			<View padding='giant'>
				<BigTitle
					title={t('passwordResetNewPass.forgotPass')}
					withBackAction
				/>

				<View marginTop='large'>
					<CInput
						autoFocus
						icon={lockIcon}
						type='password'
						placeholder={t('passwordResetNewPass.newPass')}
						value={newPassword}
						onChange={setNewPassword}
					/>
				</View>

				<View marginTop='large'>
					<CInput
						icon={lockIcon}
						type='password'
						placeholder={t('passwordResetNewPass.confirmPass')}
						value={confirmPassword}
						onChange={setConfirmPassword}
					/>
				</View>

				<View marginTop='giant'>
					<CButton
						disabled={!newPassword || newPassword !== confirmPassword}
						backgroundColor={
							newPassword && newPassword === confirmPassword ? 'secondary-300' : 'neutral-100'
						}
						borderColor={newPassword && newPassword === confirmPassword ? 'secondary-300' : 'neutral-500'}
						color={newPassword && newPassword === confirmPassword ? '' : 'neutral-500'}
						label={t('passwordResetNewPass.sendButton')}
						onPress={confirmNewPassword}
					/>
				</View>
			</View>

			<Alert
				type='negative'
				show={showErrorAlert}
				onDismiss={() => setShowErrorAlert(false)}
				duration={7}
				message={t('passwordResetNewPass.messageError')}
			/>
		</Window>
	)
}
