import { setScreenView } from '../services/trackingService'
import { Spacing, CustomButton, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-components-shared'
import { goHome, openAccount } from '../services/navigationService'
import { useTranslation } from 'eitri-i18n'

export default function OrderCompleted(props) {
	const orderId = props.location?.state?.orderId
	const { t } = useTranslation()

	useEffect(() => {
		setScreenView('OrderCompleted')
	}, [])

	return (
		<Window topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={true}
				contentText={t('orderCompleted.title')}
			/>
			<View
				padding='large'
				direction='column'
				display='flex'
				marginTop='big'
				gap={20}>
				<View
					display='flex'
					direction='column'
					width='100%'
					alignItems='center'
					justifyContent='center'>
					<Icon
						width={45}
						height={45}
						color={'positive-700'}
						iconKey={'check-circle'}
					/>
					<Spacing height={15} />
					<Text
						width='100%'
						textAlign='center'
						fontSize='display'
						fontWeight='bold'>
						{t('orderCompleted.txtCongratulation')}
					</Text>
				</View>

				<View marginTop='large'>
					<Text
						fontSize='large'
						width='100%'
						textAlign='center'>
						{t('orderCompleted.txtOrderSuccessful')}
					</Text>
				</View>

				<View
					backgroundColor='neutral-100'
					paddingHorizontal='medium'
					paddingVertical='large'
					marginTop='small'
					justifyContent='center'
					alignItems='center'
					direction='row'>
					<Text
						fontSize='lerge'
						fontWeight='bold'>
						{t('orderCompleted.txtOrderNumber')}
					</Text>
					&nbsp;
					<Text fontSize='small'>{orderId}</Text>
				</View>

				<Text
					fontSize='large'
					textAlign='center'>
					{t('orderCompleted.txtOrderFollow')}
				</Text>

				<View
					direction='column'
					justifyContent='center'
					alignItems='center'>
					<CustomButton
						borderRadius='pill'
						marginTop='large'
						label={t('orderCompleted.labelSeeOrders')}
						onPress={openAccount}
						block
					/>
					<Spacing height={15} />
					<CustomButton
						borderRadius='pill'
						marginTop='large'
						label={t('orderCompleted.labelBack')}
						onPress={goHome}
						backgroundColor='accent-100'
						color='primary-700'
						block
					/>
				</View>
			</View>
		</Window>
	)
}
