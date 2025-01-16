import Eitri from 'eitri-bifrost'
import CheckoutInput from '../components/Checkout/CheckoutInput'
import { CustomButton, Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-components-shared'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { getUserByEmail, registerToNotify } from '../services/cartService'
import { sendPageView } from '../services/trackingService'
import { useTranslation } from 'eitri-i18n'

export default function PersonalData() {
	const [isLoading, setIsLoading] = useState(false)

	const [isLegalPerson, setIsLegalPerson] = useState(false)
	const [personalData, setPersonalData] = useState({
		email: '',
		firstName: '',
		lastName: '',
		documentType: '',
		document: '',
		phone: '',
		dob: '',
		corporateName: '',
		tradeName: '',
		corporateDocument: '',
		corporatePhone: '',
		isCorporate: false,
		stateInscription: ''
	})

	const [userDataVerified, setUserDataVerified] = useState(false)
	const [socialNumberError, setSocialNumberError] = useState(false)

	const { cart, addCustomerData } = useLocalShoppingCart()

	const { t } = useTranslation()

	useEffect(() => {
		if (cart) {
			setPersonalData({
				...personalData,
				...cart.clientProfileData
			})
			if (cart?.clientProfileData?.email) {
				setUserDataVerified(true)
			}
		}
		sendPageView('Dados pessoais')
	}, [cart])

	useEffect(() => {
		if (personalData?.document?.length !== 11) setSocialNumberError(false)
		if (personalData?.document?.length === 11) checkSocialNumber(personalData?.document)
	}, [personalData?.document])

	const handlePersonalDataChange = (key, value) => {
		setPersonalData({ ...personalData, [key]: value })
	}

	const setUserData = () => {
		const localPersonalData = {
			email: personalData.email,
			firstName: personalData.firstName,
			lastName: personalData.lastName,
			documentType: 'cpf',
			document: personalData.document,
			phone: personalData.phone,
			dob: personalData.dob,
			isCorporate: false,
			corporateName: '',
			tradeName: '',
			corporateDocument: personalData.corporateDocument,
			corporatePhone: '',
			stateInscription: ''
		}
		addUserData(localPersonalData)
	}

	const addUserData = async userData => {
		try {
			setIsLoading(true)
			await addCustomerData(userData, cart.orderFormId)
			setIsLoading(false)
			Eitri.navigation.navigate({ path: 'FinishCart', replace: true })
		} catch (error) {
			console.log('error', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleLegalPerson = () => {
		setIsLegalPerson(!isLegalPerson)
	}

	const findUserByEmail = async () => {
		setIsLoading(true)
		const client = await getUserByEmail(personalData.email)
		if (client.userProfileId) {
			await addCustomerData({ email: personalData.email }, cart.orderFormId)
			Eitri.navigation.navigate({ path: 'FinishCart', replace: true })
			registerToNotify(client.userProfileId)
			setUserDataVerified(true)
		} else {
			setUserDataVerified(true)
		}

		setIsLoading(false)
	}

	const personalInputOptions = [
		{
			id: 'firstName',
			label: 'firstName',
			type: 'string',
			title: t('personalData.frmName'),
			placeholder: t('personalData.placeholderName'),
			inputMode: 'string'
		},
		{
			label: 'lastName',
			type: 'string',
			title: t('personalData.frmLastName'),
			placeholder: t('personalData.placeholderLastName'),
			inputMode: 'string'
		},
		{
			label: 'document',
			type: 'string',
			title: t('personalData.frmTaxpayerId'),
			placeholder: t('personalData.placeholderTaxpayerId'),
			inputMode: 'numeric',
			mask: '999.999.999-99'
		},
		{
			label: 'phone',
			type: 'string',
			title: t('personalData.frmPhone'),
			placeholder: t('personalData.placeholderPhone'),
			inputMode: 'tel',
			mask: '(99) 9999-99999'
		}
	]

	const corporateInputOptions = [
		{
			label: 'corporateName',
			type: 'string',
			title: t('personalData.frmCorporateName'),
			placeholder: t('personalData.placeholderCorporateName'),
			inputMode: 'string'
		},
		{
			label: 'tradeName',
			type: 'string',
			title: t('personalData.frmFantasyName'),
			placeholder: t('personalData.placeholderFantasyName'),
			inputMode: 'string'
		},
		{
			label: 'corporateDocument',
			type: 'string',
			title: t('personalData.frmCorporateDocument'),
			placeholder: t('personalData.placeholderCorporateDocument'),
			inputMode: 'numeric',
			mask: '99.999.999/9999-99'
		},
		{
			label: 'corporatePhone',
			type: 'string',
			title: t('personalData.frmCorporatePhone'),
			placeholder: t('personalData.placeholderCorporatePhone'),
			inputMode: 'tel',
			mask: '(99) 99999-9999'
		},
		{
			label: 'stateInscription',
			type: 'string',
			title: t('personalData.frmStateInscription'),
			placeholder: t('personalData.placeholderStateInscription'),
			inputMode: 'string'
		}
	]

	const verifySocialNumber = cpf => {
		if (!cpf || cpf?.length !== 11 || cpf.match(/(\d)\1{10}/)) return false

		let sum = 0
		let rest

		for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
		rest = (sum * 10) % 11

		if (rest === 10 || rest === 11) rest = 0
		if (rest !== parseInt(cpf.substring(9, 10))) return false

		sum = 0
		for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
		rest = (sum * 10) % 11

		if (rest === 10 || rest === 11) rest = 0
		if (rest !== parseInt(cpf.substring(10, 11))) return false

		return true
	}

	const checkSocialNumber = document => {
		const verifiedSocialNumber = verifySocialNumber(document)
		if (verifiedSocialNumber) {
			setSocialNumberError(false)
		} else {
			setSocialNumberError(true)
		}
	}

	const handleDataFilled = () => {
		return (
			personalData?.email !== '' &&
			personalData?.firstName !== '' &&
			personalData?.lastName !== '' &&
			verifySocialNumber(personalData?.document) &&
			personalData?.phone !== ''
		)
	}

	return (
		<Window
			topInset
			bottomInset>
			{isLoading && <Loading fullScreen />}
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={true}
				contentText={t('personalData.title')}
			/>

			<View
				padding='large'
				grow='1'
				direction='column'
				justifyContent='between'>
				<View>
					<View
						display='flex'
						direction='column'
						gap='16px'>
						<View
							display={'flex'}
							gap={'8px'}
							width={'100%'}
							alignItems={'end'}>
							<CheckoutInput
								autoFocus={true}
								label={t('personalData.frmEmail')}
								showClearInput={false}
								type={'email'}
								value={personalData['email'] || ''}
								onChange={text => {
									handlePersonalDataChange('email', text)
								}}
								placeholder={t('personalData.placeholderEmail')}
								inputMode={'email'}
							/>
							<Touchable
								backgroundColor={'primary-700'}
								borderRadius={'small'}
								padding={'extra-small'}
								onPress={findUserByEmail}>
								<Text
									fontWeight={'bold'}
									fontSize={'nano'}
									color={'neutral-100'}>
									OK
								</Text>
							</Touchable>
						</View>

						{userDataVerified &&
							personalInputOptions.map(inputOption => (
								<CheckoutInput
									autoFocus={inputOption.autoFocus}
									key={inputOption.label}
									label={inputOption.title}
									showClearInput={false}
									type={inputOption.type}
									value={personalData[inputOption.label] || ''}
									onChange={text => {
										handlePersonalDataChange(inputOption.label, text)
									}}
									placeholder={inputOption.placeholder}
									inputMode={inputOption.inputMode}
									mask={inputOption.mask}
								/>
							))}

						{userDataVerified && (
							<View
								justifyContent='center'
								alignItems='center'
								direction='column'>
								<Button
									block={false}
									backgroundColor='none'
									label={
										isLegalPerson ? t('personalData.labelPerson') : t('personalData.labelCorporate')
									}
									color='primary-900'
									variant='text'
									textDecoration='underline'
									onPress={handleLegalPerson}
								/>
							</View>
						)}

						{userDataVerified &&
							isLegalPerson &&
							corporateInputOptions.map(inputOption => (
								<CheckoutInput
									key={inputOption.label}
									label={inputOption.title}
									showClearInput={false}
									type={inputOption.type}
									value={personalData[inputOption.label]}
									onChange={text => handlePersonalDataChange(inputOption.label, text)}
									placeholder={inputOption.placeholder}
								/>
							))}
					</View>
				</View>

				{socialNumberError && (
					<View
						direction='column'
						gap='16px'
						backgroundColor='negative-700'
						padding='small'
						borderRadius='small'
						marginHorizontal='small'>
						<Text color='neutral-100'>{t('personalData.errorInvalidDoc')}</Text>
					</View>
				)}

				<View
					alignItems='center'
					paddingHorizontal='extra-small'
					marginTop='small'>
					<CustomButton
						borderRadius='pill'
						disabled={!handleDataFilled()}
						block
						label={t('personalData.labelButton')}
						onPress={setUserData}
					/>
				</View>
			</View>
		</Window>
	)
}
