import { useTranslation } from 'eitri-i18n'

export default function ModalOfferingGender(props) {
	const { show, onConfirm, onCancel } = props

	const [gender, setGender] = useState('Menino')
	const [modalOpen, setModalOpen] = useState(false)

	const { t } = useTranslation()

	useEffect(() => {
		setModalOpen(show)
	}, [show])

	const _onConfirm = () => {
		onConfirm(gender)
	}

	const _onCancel = () => {
		onCancel()
	}

	return (
		<Modal
			show={modalOpen}
			onClose={_onCancel}>
			<View
				backgroundColor='background-color'
				padding='large'
				borderRadius='small'>
				<View>
					<Text
						block
						fontWeight='bold'
						fontSize='medium'>
						{t('modalOfferingGender.labelReceiverGift')}
					</Text>
					<Text
						block
						fontSize='small'>
						{t('modalOfferingGender.labelSelectGender')}
					</Text>
				</View>
				<View
					borderColor='neutral-500'
					paddingVertical='small'
					marginTop='small'
					borderTopWidth='hairline'>
					<Touchable
						onPress={() => setGender('Menino')}
						borderWidth='thin'
						borderRadius='small'
						padding='nano'
						borderColor={gender === 'Menino' ? 'primary-700' : 'neutral-300'}>
						<Text
							fontSize='small'
							fontWeight='bold'>
							{t('modalOfferingGender.txtBoy')}
						</Text>
					</Touchable>
					<Touchable
						onPress={() => setGender('Menina')}
						borderWidth='thin'
						borderRadius='small'
						padding='nano'
						marginTop='small'
						borderColor={gender === 'Menina' ? 'primary-700' : 'neutral-300'}>
						<Text
							fontSize='small'
							fontWeight='bold'>
							{t('modalOfferingGender.txtGirl')}
						</Text>
					</Touchable>
				</View>
				<View marginTop='small'>
					<Touchable
						onPress={_onConfirm}
						marginTop='small'
						padding='medium'
						display='flex'
						justifyContent='center'
						backgroundColor='primary-700'
						borderRadius='pill'>
						<Text
							color='background-color'
							fontWeight='bold'>
							{t('modalOfferingGender.txtConfirm')}
						</Text>
					</Touchable>
					<Touchable
						onPress={_onCancel}
						marginTop='small'
						padding='medium'
						display='flex'
						justifyContent='center'
						backgroundColor='neutral-100'
						borderRadius='pill'>
						<Text
							color='primary-700'
							fontWeight='bold'>
							{t('modalOfferingGender.txtCancel')}
						</Text>
					</Touchable>
				</View>
			</View>
		</Modal>
	)
}
