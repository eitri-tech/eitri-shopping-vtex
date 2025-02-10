import { useTranslation } from 'eitri-i18n'
import { useLocalShoppingCart } from '../../providers/LocalCart'

export default function InstallmentsMsg(props) {
	const { cart } = useLocalShoppingCart()
	const { t } = useTranslation()

	const findMaxInstallments = installmentOptions => {
		let maxInstallments = 0

		installmentOptions?.forEach(option => {
			option.installments.forEach(installment => {
				if (installment.count > maxInstallments) {
					maxInstallments = installment.count
				}
			})
		})

		return maxInstallments
	}

	const maxInstallments = findMaxInstallments(cart?.paymentData?.installmentOptions)

	if (!maxInstallments || maxInstallments < 2) {
		return null
	}

	return (
		<View
			display='flex'
			backgroundColor={'primary-100'}
			justifyContent='center'
			alignItems='center'>
			<View
				color={'primary-100'}
				contentColor>
				<Icon
					color={'primary-100'}
					contentColor
					iconKey={'credit-card'}
					height={20}
				/>
			</View>
			<Text
				color={'primary-100'}
				contentColor
				paddingLeft='nano'
				paddingVertical='nano'>
				{`${t('cart.labelInstalmentUntil')} ${maxInstallments}x`}
			</Text>
		</View>
	)
}
