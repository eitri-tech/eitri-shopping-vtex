import Rating from '../Rating/Rating'
import { Spacing } from 'eitri-shopping-vtex-components-shared'
import TagsComponent from '../Tags/TagsComponent'
import { formatAmount } from '../../utils/utils'
import { useTranslation } from 'eitri-i18n'

export default function MainDescription(props) {
	const { product, reviewAverage, reviewCount, currentSku, locale, currency } = props

	const { t } = useTranslation()
	
	const discoverInstallments = item => {
		try {
			const mainSeller = item.sellers.find(seller => seller.sellerDefault)
			if (mainSeller) {
				const betterInstallment = mainSeller.commertialOffer.Installments.reduce((acc, installment) => {
					if (!acc) {
						acc = installment
						return acc
					} else {
						if (installment.NumberOfInstallments > acc.NumberOfInstallments) {
							acc = installment
						}
						return acc
					}
				}, null)

				return `${t('mainDescription.txtUntil')} ${betterInstallment.NumberOfInstallments}x ${t('mainDescription.txtOf')} ${formatAmount(betterInstallment.Value, locale, currency)}`
			}
			return ''
		} catch (error) {
			return ''
		}
	}

	return (
		<View
			display='flex'
			direction='column'>
			<View display='flex'>
				<TagsComponent product={product} />
			</View>
			<Spacing height='10px' />
			<Text
				fontSize='large'
				fontWeight='bold'>
				{currentSku?.nameComplete || currentSku?.name}
			</Text>
			{product?.productReference && (
				<>
					<Text
						fontSize='extra-small'
						color='neutral-500'>
						{' '}
						{`ref ${product?.productReference}`}
					</Text>
					<Spacing height='8px' />
				</>
			)}
			<Spacing height='8px' />
			{currentSku?.sellers[0]?.commertialOffer?.Price <
        currentSku?.sellers[0]?.commertialOffer?.ListPrice && (
				<Text
					fontSize='small'
					color='neutral-500'
					textDecoration='line-through'
					fontWeight='bold'>
					{' '}
					{formatAmount(currentSku?.sellers[0]?.commertialOffer?.ListPrice, locale, currency)}
				</Text>
			)}
			<Text
				fontSize='extra-large'
				color='primary-700'
				fontWeight='bold'>
				{' '}
				{formatAmount(currentSku?.sellers[0]?.commertialOffer?.Price, locale, currency)}
			</Text>
			<Spacing height='8px' />
			<Text
				fontSize='small'
				color='neutral-500'>
				{' '}
				{discoverInstallments(currentSku)}
			</Text>
		</View>
	)
}
