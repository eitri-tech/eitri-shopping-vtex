import icon360 from '../../assets/images/icon-360.png'
import ModalImage3d from './components/ModalImage3d'

export default function Image3d(props) {
	const { frameUrl } = props

	if (!frameUrl) return null

	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<Touchable
				display='flex'
				justifyContent='end'
				paddingHorizontal='large'
				onPress={() => setShowModal(true)}>
				<Image
					src={icon360}
					width={52}
				/>
			</Touchable>

			<ModalImage3d
				visible={showModal}
				onClose={() => setShowModal(false)}
				frameUrl={frameUrl}
			/>
		</>
	)
}
