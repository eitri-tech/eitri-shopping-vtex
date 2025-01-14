import { Spacing, CustomButton } from 'eitri-shopping-demo-shared'

export default function ModalConfirm(props) {
	const { text, showModal, removeItem, closeModal } = props

	return (
		<Modal
			show={showModal}
			position={'center'}
			onClose={closeModal}>
			<View
				display='flex'
				direction='column'
				paddingHorizontal='large'
				paddingVertical='large'
				backgroundColor='accent-100'
				alignItems='center'
				borderRadius='medium'
				borderColor='neutral-300'
				width='80%'>
				<View
					display='flex'
					direction='column'
					width='100%'
					alignItems='center'
					justfyContent='center'>
					<Spacing height={10} />
					<Text
						textAlign='center'
						fontSize='medium'
						fontWeight='bold'>
						{text}
					</Text>
					<Spacing height={25} />
					<View width='100%'>
						<CustomButton
							marginTop='large'
							label={'Excluir'}
							onPress={() => removeItem(true)}
							block
						/>
						<Spacing height={15} />
						<CustomButton
							marginTop='large'
							label={'Cancelar'}
							onPress={() => removeItem(false)}
							backgroundColor='accent-100'
							color='primary-700'
							block
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}
