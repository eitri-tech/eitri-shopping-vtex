import { Divisor, CustomButton, Spacing } from 'eitri-shopping-demo-shared'
import Eitri from 'eitri-bifrost'

// TODO - precisa internacionalizar?
export default function ModalPoints(props) {
	const { showModal, closeModal, modalInfo, rescuePoints, loadingButton } = props

	const [buttonTextLabel, setButtonTextLabel] = useState('Copiar')

	const copyCoupon = async code => {
		await Eitri.clipboard.setText({
			text: code
		})
		setButtonTextLabel('Copiado')
	}
	return (
		<Modal
			show={showModal}
			position={'center'}
			showBackdrop={true}
			onClose={() => closeModal()}>
			<View
				display='flex'
				justifyContent='center'
				backgroundColor='accent-100'
				borderWidth='hairline'
				borderRadius='circular'
				borderColor='neutral-300'
				direction='column'
				padding='medium'
				width='80vw'>
				{modalInfo.type === 'selectedPoint' && (
					<View>
						<View
							display='flex'
							direction='column'
							justifyContent='center'
							alignItems='center'
							padding='medium'>
							<Text
								fontWeight='bold'
								color='primary-700'>
								Cupom de:
							</Text>
							<Text
								fontSize='large'
								fontWeight='bold'>
								{modalInfo.item.Title}
							</Text>
							<Text fontWeight='bold'>{`por ${modalInfo.item.Points} pontos`}</Text>
						</View>
						<Divisor />
						<View
							display='flex'
							direction='column'
							justifyContent='center'
							alignItems='center'
							paddingVertical='medium'>
							<View
								display='flex'
								alignItems='center'
								backgroundColor='neutral-100'
								borderRadius='circular'
								padding='small'>
								<View padding='small'>
									<Icon
										width={24}
										height={24}
										color={'neutral-900'}
										iconKey='alert-circle'
									/>
								</View>

								<Text fontWeight='bold'>{modalInfo.item.Description}</Text>
							</View>
						</View>
						<CustomButton
							marginTop='large'
							label={'Confirmar'}
							onPress={() => rescuePoints(modalInfo.item.Id)}
							isLoanding={loadingButton}
							block
						/>
						<Spacing height={'10px'} />

						<CustomButton
							marginTop='large'
							label={'Cancelar'}
							onPress={() => closeModal()}
							backgroundColor='neutral-100'
							color='primary-700'
							block
						/>
					</View>
				)}
				{modalInfo.type === 'rescueSuccess' && (
					<View>
						<View
							display='flex'
							direction='column'
							alignItems='center'
							padding='small'>
							<Icon
								width={35}
								height={35}
								color={'positive-700'}
								iconKey='check-circle'
							/>
							<Text
								fontSize='extra-large'
								fontWeight='bold'>
								Troca Confirmada
							</Text>
						</View>
						<View
							display='flex'
							direction='column'
							alignItems='center'
							padding='small'
							justifyContent='center'>
							<Text
								textAlign='center'
								color='neutral-500'
								fontWeight='bold'>
								{modalInfo.response.Item.ResultMessage}
							</Text>
							{modalInfo.response.Item.HasCouponCode && (
								<View
									borderWidth='hairline'
									borderColor='neutral-100'
									borderRadius='small'
									padding='medium'
									margin='small'>
									<Text overflowWrap='break-word'>{modalInfo.response.Item.CouponCode}</Text>
								</View>
							)}
							<Text
								textAlign='center'
								color='neutral-500'
								fontWeight='bold'>
								{modalInfo.response.Item.AfterMessage}
							</Text>
						</View>
						<Spacing height={'10px'} />
						<View>
							{modalInfo.response.Item.HasCouponCode && (
								<CustomButton
									marginTop='large'
									label={buttonTextLabel}
									onPress={() => copyCoupon(modalInfo.response.Item.CouponCode)}
									block
								/>
							)}
							<Spacing height={'10px'} />

							<CustomButton
								marginTop='large'
								label={'Fechar'}
								onPress={() => closeModal()}
								backgroundColor='neutral-100'
								color='primary-700'
								block
							/>
						</View>
					</View>
				)}
			</View>
		</Modal>
	)
}
