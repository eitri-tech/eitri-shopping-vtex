import { useTranslation } from 'eitri-i18n'

export default function EmptyCart(props) {
	const { icon, buttonPress, buttonLabel } = props

	const { t } = useTranslation()

	return (
		<View
			direction='column'
			alignItems='center'
			grow='1'>
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
					gap='25px'
					marginBottom='medium'>
					<Image
						src={icon}
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
				</View>
			</View>
		</View>
	)
}
