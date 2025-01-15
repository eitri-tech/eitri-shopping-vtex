import CButton from '../../components/CButton/CButton'
import CodeInput from '../../components/PasswordResetCode/CodeInput'
import BigTitle from '../../components/BigTitle/BigTitle'
import { HEADER_TYPE, HeaderTemplate } from 'eitri-shopping-demo-shared'
import { navigate, PAGES } from '../../services/NavigationService'
import { useTranslation } from 'eitri-i18n'

export default function PasswordResetCode(props) {
	const [recoveryCode, setRecoveryCode] = useState('')

	const RECOVERY_CODE_LENGTH = 6

	const email = props?.location?.state?.email

	const { t } = useTranslation()
	
	const goToPasswordNewPass = () => {
		if (recoveryCode.length !== RECOVERY_CODE_LENGTH) {
			return
		}
		navigate(PAGES.PASSWORD_RESET_NEW_PASS, { email: email, recoveryCode })
	}

	const onCodeFilled = value => {
		setRecoveryCode(value)
	}

	return (
		<Window topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.TEXT}
				contentText={`${t('passwordResetCode.headerText')}`}
			/>

			<View padding='giant'>
				<BigTitle
					title={t('passwordResetCode.forgotPass')}
					withBackAction
				/>

				<View marginTop='large'>
					<Text block>
						{t('passwordResetCode.messageEmail')}
						<Text marginLeft='small' fontWeight='bold'>{email}</Text>
					</Text>
				</View>

				<View marginTop='large'>
					<CodeInput
						length={6}
						onFill={onCodeFilled}
					/>
				</View>

				<View marginTop='giant'>
					<CButton
						disabled={recoveryCode.length !== RECOVERY_CODE_LENGTH}
						backgroundColor={recoveryCode.length === RECOVERY_CODE_LENGTH ? 'secondary-300' : 'neutral-100'}
						borderColor={recoveryCode.length === RECOVERY_CODE_LENGTH ? 'secondary-300' : 'neutral-500'}
						color={recoveryCode.length === RECOVERY_CODE_LENGTH ? '' : 'neutral-500'}
						label={t('passwordResetCode.sendButton')}
						onPress={goToPasswordNewPass}
					/>
				</View>
			</View>
		</Window>
	)
}
