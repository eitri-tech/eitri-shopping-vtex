import Eitri from 'eitri-bifrost'
import { useLocalShoppingCart } from '../../providers/LocalCart'
import SimpleCard from '../Card/SimpleCard'
import personalIcon from '../../assets/images/personal.svg'
import { removeClientData } from '../../services/cartService'
import { useTranslation } from 'eitri-i18n'

export default function UserData(props) {
	const { cart, startCart } = useLocalShoppingCart()
	const { clientProfileData, onPress } = props
	const { email, firstName, lastName, document, phone } = clientProfileData || {}
	const { t } = useTranslation()

	const clearClientData = async () => {
		try {
			if (cart?.clientProfileData) {
				await removeClientData()
				await startCart()
				Eitri.navigation.navigate({ path: 'PersonalData' })
			}
		} catch (e) {
			console.log('Erro ao limpar dados do cliente', e)
		}
	}

	return (
		<SimpleCard
			isFilled={email}
			onPress={onPress}
			title={t('userData.txtPersonData')}
			icon={personalIcon}
			index='1'>
			<View
				display='flex'
				direction='column'>
				<View
					direction='row'
					justifyContent='between'>
					<Text
						marginBottom='quark'
						fontSize='extra-small'>
						{email}
					</Text>
					{clientProfileData && !cart.canEditData && (
						<Touchable onPress={clearClientData}>
							<Text
								marginBottom='extra-small'
								color='primary-300'
								textDecoration='underline'>
									{t('userData.txtMessageLeave')}
							</Text>
						</Touchable>
					)}
				</View>
				<Text
					marginBottom='nano'
					fontSize='extra-small'>{`${firstName} ${lastName}`}</Text>
				<Text
					marginBottom='nano'
					fontSize='extra-small'>
					{document}
				</Text>
				<Text
					marginBottom='nano'
					fontSize='extra-small'>
					{phone}
				</Text>
			</View>
		</SimpleCard>
	)
}
