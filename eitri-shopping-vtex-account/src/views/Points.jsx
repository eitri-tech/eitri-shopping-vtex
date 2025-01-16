import Eitri from 'eitri-bifrost'
import { Divisor, HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-components-shared'
import { getObjectives, getPoints, getRewards, login, rescuePoints } from '../services/BonifiqService/BonifiqService'
import Terms from '../components/Terms/Terms'
import Information from '../components/Information/Information'
import ModalPoints from '../components/ModalPoints/ModalPoints'
import { sendPageView } from '../services/TrackingService'
import { navigate, PAGES } from '../services/NavigationService'

export default function Points(props) {
	const [points, setPoints] = useState()
	const [rewards, setRewards] = useState()
	const [objectives, setObjectives] = useState()
	const [publicId, setPublicId] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [modalInfo, setModalInfo] = useState('')
	const [loadingButton, setLoadingButton] = useState(false)

	const [showInfo, setShowInfo] = useState('rewards')

	const customerData = props.location?.state?.customerData
	const hideBackButton = props.location?.state?.hideBackButton

	const handlePointInformation = async () => {
		try {
			const response = await login(customerData?.email)
			let publicId = response?.Item?.PublicId
			setPublicId(publicId)
			setIsLoading(true)

			await fetchAndSetPointDetails(publicId)
		} catch (error) {
			console.error('Error handlePointInformation in:', error)
		}
	}

	useEffect(() => {
		Eitri.eventBus.subscribe({
			channel: 'onUserTappedActiveTab',
			callback: _ => {
				Eitri.navigation.backToTop()
			}
		})
		handlePointInformation()
		sendPageView('Meus pontos')
	}, [customerData?.email, publicId])

	const fetchAndSetPointDetails = async publicId => {
		const [pointsData, rewardsData, objectivesData] = await Promise.all([
			getPoints(publicId),
			getRewards(publicId),
			getObjectives(publicId)
		])

		setPoints(pointsData)
		setRewards(rewardsData)
		setObjectives(objectivesData)
		setIsLoading(false)
	}

	const handleShare = async text => {
		await await Eitri.share.text({
			text: text
		})
	}

	const handleInfoChange = infoType => {
		setShowInfo(infoType)
	}

	const closeModal = () => {
		setShowModal(false)
	}

	const openModal = item => {
		setShowModal(true)
		setModalInfo({ type: 'selectedPoint', item })
	}

	const rescue = async itemId => {
		setLoadingButton(true)
		let response = await rescuePoints(publicId, itemId)
		if (response?.Item?.Success) {
			setLoadingButton(false)
			setModalInfo({ type: 'rescueSuccess', response })
			fetchAndSetPointDetails(publicId)
		}
	}

	const requestLogin = () => {
		navigate(PAGES.SIGNIN, { redirectTo: PAGES.POINTS }, true)
	}

	return (
		<Window bottomInset topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={!hideBackButton}
				contentText={'Meus Pontos'}
			/>
			<View padding='small'>
				<View
					display='flex'
					justifyContent='center'
					alignItems='center'>
					{customerData?.email ? (
						<>
							<View padding='small'>
								<Icon
									width={30}
									height={30}
									color={'primary-700'}
									iconKey='user'
								/>
							</View>
							<View
								display='flex'
								direction='column'
								padding='small'>
								<Text fontSize='medium'>{customerData?.email}</Text>
								{points && (
									<Text
										fontSize='medium'
										fontWeight='bold'>
										{points?.Item?.PointsText}
									</Text>
								)}
							</View>
						</>
					) : (
						<Touchable
							onPress={requestLogin}
							marginVertical='large'
							borderColor='primary-500'
							padding='large'
							paddingHorizontal='display'
							borderWidth='hairline'
							borderRadius='small'>
							<Text
								fontWeight='bold'
								color='primary-500'>
								ACESSE SEU PROGRAMA DE PONTOS
							</Text>
						</Touchable>
					)}
				</View>
			</View>
			<Divisor />
			<View paddingVertical='small'>
				<View
					display='flex'
					justifyContent='between'
					width='100%'>
					<Touchable
						width='100%'
						onPress={() => handleInfoChange('rewards')}>
						<View
							display='flex'
							alignItems='center'
							justifyContent='center'
							width='100%'
							borderBottomWidth={showInfo === 'rewards' ? 'thin' : 'hairline'}
							paddingBottom='small'
							borderColor={showInfo === 'rewards' && 'primary-700'}>
							{showInfo === 'rewards' ? (
								<Text
									fontSize='medium'
									color='primary-700'
									fontWeight='bold'>
									Recompensas
								</Text>
							) : (
								<Text fontSize='medium'>Recompensas</Text>
							)}
						</View>
					</Touchable>
					<Touchable
						width='100%'
						onPress={() => handleInfoChange('objectives')}>
						<View
							display='flex'
							alignItems='center'
							justifyContent='center'
							width='100%'
							borderBottomWidth={showInfo === 'objectives' ? 'thin' : 'hairline'}
							paddingBottom='small'
							borderColor={showInfo === 'objectives' && 'primary-700'}>
							{showInfo === 'objectives' ? (
								<Text
									fontSize='medium'
									color='primary-700'
									fontWeight='bold'>
									Ganhe Pontos
								</Text>
							) : (
								<Text fontSize='medium'>Ganhe Pontos</Text>
							)}
						</View>
					</Touchable>
				</View>
			</View>
			{isLoading ? (
				<View
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Loading />
				</View>
			) : (
				<Information
					showInfo={showInfo}
					rewards={rewards}
					objectives={objectives}
					points={points}
					handleShare={handleShare}
					openModal={openModal}
				/>
			)}

			<Divisor />

			<View padding='small'>
				<History publicId={publicId} />
			</View>
			<Divisor />
			<View padding='small'>
				<Terms publicId={publicId} />
			</View>
			<ModalPoints
				showModal={showModal}
				closeModal={closeModal}
				modalInfo={modalInfo}
				rescuePoints={rescue}
				loadingButton={loadingButton}
			/>
		</Window>
	)
}
