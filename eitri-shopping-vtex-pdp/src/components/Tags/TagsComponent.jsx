import Eitri from 'eitri-bifrost'
import spotifyIcon from '../../assets/images/spotify.svg'
import playIcon from '../../assets/images/play.svg'
import ModalStreaming from '../Modal/ModalStreaming'
import { useTranslation } from 'eitri-i18n'

export default function TagsComponent(props) {
	const { product } = props

	const [showModal, setShowModal] = useState(false)
	const [modalContent, setModalContent] = useState(false)
	const [video, setVideo] = useState(null)
	const [spotify, setSpotify] = useState(null)
	const [videoStreamShop, setVideoStreamShop] = useState(null)

	const originalPrice = product?.items[0]?.sellers[0]?.commertialOffer?.ListPrice
	const currentPrice = product?.items[0]?.sellers[0]?.commertialOffer?.Price
	const offer = currentPrice < originalPrice || null
	const clusterHighlights = product?.clusterHighlights
	const discount = offer && Math.round(((originalPrice - currentPrice) / originalPrice) * 100)

	const { t } = useTranslation()

	useEffect(() => {
		const buildStreaming = () => {
			if (product?.allSpecifications) {
				setVideo(product['Video'])
				setSpotify(product['Àudio Spotify'])
				setVideoStreamShop(product['Vídeo StreamShop'])
			} else {
				const allSpecifications = product?.specificationGroups?.find(
					group => group.originalName === 'allSpecifications'
				)
				allSpecifications?.specifications.forEach(element => {
					if (element.name === 'Video') {
						setVideo(element.values)
					}
					if (element.name === 'Àudio Spotify') {
						setSpotify(element.values)
					}
					if (element.name === 'Vídeo StreamShop') {
						setVideoStreamShop(element.values)
					}
				})
			}
		}

		buildStreaming()
	}, [product])

	const handleModal = content => {
		setModalContent(content)
		setShowModal(!showModal)
	}

	const openStreamShop = () => {
		Eitri.openBrowser({ url: videoStreamShop[0], inApp: true })
	}

	return (
		<View width='100vw'>
			{(offer || clusterHighlights || spotify || video) && (
				<View
					display='flex'
					justifyContent='between'
					alignItems='center'>
					<View>
						{offer || clusterHighlights ? (
							<View display='flex'>
								{offer && (
									<View paddingRight='nano'>
										<Tag label={t('tagsComponent.labelOffer')} />
									</View>
								)}
								{discount && (
									<View paddingRight='nano'>
										<Tag
											label={`${discount}% off`}
											color='neutral-900'
											backgroundColor={'positive-300'}
										/>
									</View>
								)}
								{/* TODO: adicionar o "verde" mais claro no style */}
								{clusterHighlights && Object.values(clusterHighlights) == 'Lançamento' && (
									<View>
										<Tag
											label={Object.values(clusterHighlights)}
											backgroundColor={'warning-300'}
											color='neutral-900'
										/>
									</View>
								)}
							</View>
						) : (
							<View></View>
						)}
					</View>
					<View>
						{(spotify || video) && (
							<View display='flex'>
								{spotify && (
									<Touchable onPress={() => handleModal(spotify)}>
										<View padding='small'>
											<Image
												width={24}
												height={24}
												src={spotifyIcon}
											/>
										</View>
									</Touchable>
								)}
								{videoStreamShop ? (
									<Touchable onPress={openStreamShop}>
										<View padding='small'>
											<Image
												width={24}
												height={24}
												src={playIcon}
											/>
										</View>
									</Touchable>
								) : (
									<>
										{video && (
											<Touchable onPress={() => handleModal(video)}>
												<View padding='small'>
													<Image
														width={24}
														height={24}
														src={playIcon}
													/>
												</View>
											</Touchable>
										)}
									</>
								)}
							</View>
						)}
					</View>
				</View>
			)}
			{showModal && (
				<ModalStreaming
					showModal={showModal}
					handleModal={handleModal}
					content={modalContent}
				/>
			)}
		</View>
	)
}
