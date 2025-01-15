import Title from '../components/Title/Title'
import CInput from '../components/CInput/CInput'
import formatDate from '../utils/Date'
import CButton from '../components/CButton/CButton'
import { getCustomerData, setCustomerData } from '../services/CustomerService'
import { sendPageView } from '../services/TrackingService'
import Eitri from 'eitri-bifrost'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-demo-shared'

export default function EditProfile(props) {
	const [user, setUser] = useState({})

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const customerData = props?.location?.state?.customerData

		if (!customerData) {
			loadMe()
		} else {
			setUser({
				...user,
				...customerData,
				birthDate: formatDate(customerData?.birthDate)
			})
		}

		sendPageView('Edição')
	}, [])

	const handleInputChange = (target, value) => {
		setUser({
			...user,
			[target]: value
		})
	}

	const handleSave = async () => {
		setIsLoading(true)
		const { isValid, isoDate } = convertToISO(user.birthDate)
		if (!isValid) {
			setIsLoading(false)
			return
		}
		const updatedUser = await setCustomerData({ ...user, birthDate: isoDate })
		setUser({ ...updatedUser, birthDate: formatDate(updatedUser?.birthDate) })
		setIsLoading(false)
	}

	const loadMe = async () => {
		setIsLoading(true)
		const customerData = await getCustomerData()
		setUser({ ...customerData, birthDate: formatDate(customerData?.birthDate) })
		setIsLoading(false)
	}

	function convertToISO(dateStr) {
		const dt = dateStr.replaceAll('/', '')
		const day = parseInt(dt.substring(0, 2), 10)
		const month = parseInt(dt.substring(2, 4), 10)
		const year = parseInt(dt.substring(4, 8), 10)

		const date = new Date(year, month - 1, day)

		// Valid date
		let isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

		if (!isValid) {
			return { isValid }
		}

		// More than 18 years
		const today = new Date()

		isValid =
			today.getFullYear() - year > 18 ||
			(today.getFullYear() - year === 18 && today.getMonth() > month) ||
			(today.getFullYear() - year === 18 && today.getMonth() === month && today.getDate() >= day)

		if (!isValid) {
			return { isValid }
		}

		return { isValid, isoDate: date.toISOString() }
	}

	const openWhatsApp = async () => {
		try {
			await Eitri.openBrowser({ url: 'https://api.whatsapp.com/send?phone=+5511959612798' })
		} catch (e) {
			console.error('Error mailToSac', e)
		}
	}

	return (
		<Window
			bottomInset
			topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={true}
				contentText={'Editar perfil'}
			/>

			<Loading
				fullScreen
				isLoading={isLoading}
			/>

			<View
				padding='large'
				direction='column'
				gap='16px'>
				<View>
					<Text
						block
						fontWeight='bold'
						fontSize='extra-small'>
						Nome
					</Text>
					<View
						marginTop='nano'
						display='flex'
						gap='6px'>
						<CInput
							backgroundColor='background-color'
							placeholder='Nome'
							value={user?.firstName || ''}
							onChange={value => handleInputChange('firstName', value)}
						/>
						<CInput
							backgroundColor='background-color'
							placeholder='Sobrenome'
							value={user?.lastName || ''}
							onChange={value => handleInputChange('lastName', value)}
						/>
					</View>
				</View>

				<View>
					<Text
						block
						marginBottom='nano'
						fontWeight='bold'
						fontSize='extra-small'>
						Data de nascimento
					</Text>
					<CInput
						backgroundColor='background-color'
						placeholder='DD/MM/AAAA'
						inputMode='numeric'
						mask='99/99/9999'
						value={user?.birthDate || ''}
						onChange={value => handleInputChange('birthDate', value)}
					/>
				</View>

				<View>
					<Text
						block
						marginBottom='nano'
						fontWeight='bold'
						fontSize='extra-small'>
						Telefone
					</Text>
					<CInput
						backgroundColor='background-color'
						placeholder='(99) 99999-9999'
						value={user?.homePhone?.replace('+55', '') || ''}
						inputMode='numeric'
						onChange={value => handleInputChange('homePhone', value)}
						mask='(99) 99999-9999'
					/>
				</View>

				<View>
					<Text
						block
						marginBottom='nano'
						fontWeight='bold'
						fontSize='extra-small'>
						Sexo
					</Text>
					<View
						display='flex'
						gap='16px'>
						<View
							direction='row'
							align='center'>
							<Radio
								value={'male'}
								checked={user?.gender === 'male'}
								onChange={value => handleInputChange('gender', value)}
							/>
							<Text
								block
								marginLeft='nano'>
								Masculino
							</Text>
						</View>
						<View
							direction='row'
							align='center'>
							<Radio
								value={'female'}
								checked={user?.gender === 'female'}
								onChange={value => handleInputChange('gender', value)}
							/>
							<Text
								block
								marginLeft='nano'>
								Feminino
							</Text>
						</View>
					</View>
				</View>

				<View>
					<Text
						block
						marginBottom='nano'
						fontWeight='bold'
						fontSize='extra-small'>
						CPF
					</Text>
					<CInput
						backgroundColor='background-color'
						placeholder='000.000.000-00'
						value={user.document || ''}
						inputMode='numeric'
						onChange={value => handleInputChange('document', value)}
						mask='999.999.999-99'
					/>
				</View>

				<View>
					<CButton
						label='Salvar'
						onPress={handleSave}
					/>
				</View>
			</View>
		</Window>
	)
}
