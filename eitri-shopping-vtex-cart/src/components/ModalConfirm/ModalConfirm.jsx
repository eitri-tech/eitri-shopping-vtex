import { Spacing, CustomButton } from 'eitri-shopping-vtex-components-shared'

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
					<Text
						textAlign='center'
						fontSize='medium'
						fontWeight='bold'>
						{text}
					</Text>
					<View width='100%'>
						<CustomButton
							marginTop='large'
							label={'Excluir'}
							onPress={() => removeItem(true)}
							block
						/>
						<CustomButton
							variant='outlined'
							marginTop='small'
							label={'Cancelar'}
							onPress={() => removeItem(false)}
							block
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}
