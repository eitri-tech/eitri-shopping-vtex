import Eitri from 'eitri-bifrost'
import { HeaderComponent, Spacing, CustomButton } from 'eitri-shopping-vtex-components-shared'
import { openAccount } from '../services/navigationService'

export default function ExternalProviderOrderFinished(props) {
	const PAGE = 'External Provider Order Finished'

	return (
		<Window>
			<HeaderComponent topInset />
			<View
				padding='large'
				direction='column'
				display='flex'
				marginTop='big'
				gap={20}>
				<View marginTop='large'>
					<Text
						fontSize='large'
						width='100%'
						fontWeight='bold'
						textAlign='center'>
						Solicitação de pedido enviada
					</Text>
				</View>
				<Text
					fontSize='small'
					textAlign='center'>
					Acompanhe seu pedido em “Meus pedidos”. Se houve algum problema no pagamento, é só clicar em “Tentar
					novamente”!
				</Text>

				<View
					direction='column'
					justifyContent='center'
					alignItems='center'>
					<CustomButton
						marginTop='large'
						label={'Ver pedidos'}
						onPress={() => {
							openAccount()
						}}
						block
					/>
					<Spacing height={20} />
					<CustomButton
						label={'Tentar novamente'}
						backgroundColor='none'
						color='primary-700'
						borderColor='primary-700'
						borderWidth='hairline'
						onPress={() => {
							Eitri.navigation.back()
						}}
					/>
				</View>
			</View>
		</Window>
	)
}
