import { useTranslation } from 'eitri-i18n'

export default function PristineView() {
	const { t } = useTranslation()

	return (
		<View
			grow={'1'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			//   backgroundColor="neutral-500"
		>
			<Text
				fontSize={'large'}
				color={'neutral-700'}
				fontWeight={'bold'}>
				{t('pristineView.content')}
			</Text>
		</View>
	)
}
