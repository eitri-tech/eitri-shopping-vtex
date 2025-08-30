import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'
import iconCart from '../assets/images/cart-01.svg'
import { CustomButton } from 'eitri-shopping-vtex-components-shared'

export default function EmptyCart(props) {
	const showCloseButton = props?.location?.state?.showCloseButton

	const { t } = useTranslation()

	const closeEitriApp = () => {
		Eitri.navigation.close()
	}

	return (
		<Window
			bottomInset
			topInset>
			<View
				grow='1'
				direction='column'
				paddingVertical='giant'
				paddingHorizontal='large'
				justifyContent='center'
				alignItems='center'>
				<View
					direction='column'
					alignItems='center'
					justifyContent='center'
					gap='20px'
					marginBottom='medium'>
					<Image
						src={iconCart}
						width={'50px'}
					/>
					<View
						display='flex'
						direction='column'
						justifyContent='start'
						alignSelf='center'>
						<Text
							fontWeight='bold'
							color='primary-base'
							fontSize='extra-large'
							textAlign='center'>
							{t('emptyCart.txtEmptyCart')}
						</Text>
						<Text
							marginTop='large'
							color='neutral-700'
							fontSize='medium'
							textAlign='center'>
							{t('emptyCart.txtMessageList')}
						</Text>
					</View>
					{showCloseButton && (
						<CustomButton
							wide
							label={t('emptyCart.labelButton')}
							labelColor='neutral-500'
							onPress={closeEitriApp}
						/>
					)}
				</View>
			</View>
		</Window>
	)
}
