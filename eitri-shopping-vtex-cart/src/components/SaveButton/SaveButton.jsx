import bookmark from '../../assets/images/bookmark-01.svg'
import { useTranslation } from 'eitri-i18n'

export default function SaveButton(props) {
	const { handleSaveFavorite, isInWishlist } = props

	const { t } = useTranslation()

	return (
		<Touchable onPress={handleSaveFavorite}>
			<View
				display='flex'
				borderWidth='hairline'
				borderColor={isInWishlist ? 'primary-700' : 'neutral-500'}
				borderRadius='small'
				height='30px'
				width='85px'
				justifyContent='center'
				alignItems='center'>
				<View
					display='flex'
					justifyContent='center'
					alignItems='center'
					width='100%'>
					<Icon
						iconKey='bookmark'
						color={isInWishlist ? 'primary-700' : 'neutral-700'}
						width={16}
						height={16}
					/>
					<View
						width='4px'
						height={'2px'}></View>
					<Text
						textAlign='center'
						color={isInWishlist ? 'primary-700' : 'neutral-700'}>
						{isInWishlist ? t('saveButton.saved') : t('saveButton.save')}
					</Text>
				</View>
			</View>
		</Touchable>
	)
}
