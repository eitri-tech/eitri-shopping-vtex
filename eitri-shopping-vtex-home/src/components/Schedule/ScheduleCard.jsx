import podcast from '../../assets/icons/podcast.svg'
import liveStream from '../../assets/icons/stream.svg'
import ytLive from '../../assets/icons/ytlive.svg'
import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'

export default function ScheduleCard(props) {
	const { date, title, description, link, mode } = props

	const { t } = useTranslation()

	const iconMap = {
		Podcast: podcast,
		Live: liveStream,
		Youtube: ytLive
	}
	const getIconByMode = mode => iconMap[mode] || null
	const icon = getIconByMode(mode)

	const openLink = () => {
		Eitri.openBrowser({ url: link, inApp: true })
	}

	return (
		<Touchable
			borderWidth='hairline'
			borderColor='neutral-300'
			borderRadius='medium'
			width='312px'
			height='100%'
			display='flex'
			direction='column'
			justifyContent='between'
			alignItems='center'
			padding='large'
			onPress={openLink}>
			<View
				display='flex'
				alignSelf='start'>
				<Text
					marginBottom='small'
					color='neutral-500'
					fontSize='nano'
					fontWeight='bold'>
					{date}
				</Text>
			</View>

			<View
				display='flex'
				width='100%'
				height='100%'>
				{icon && (
					<Image
						width='24px'
						height='24px'
						marginRight='small'
						src={icon}
					/>
				)}
				<View
					height='100%'
					display='flex'
					direction='column'
					justifyContent='between'>
					<View>
						<Text
							color='primary-700'
							fontSize='extra-small'
							fontWeight='bold'
							marginBottom='quark'>
							{title}
						</Text>
						<Text
							marginBottom='nano'
							color='support-01'
							fontWeight='medium'
							fontSize='nano'
							width='100%'>
							{description}
						</Text>
					</View>
					<View
						borderRadius='pill'
						width='122px'
						height='28px'
						marginTop='auto'
						backgroundColor='primary-700'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Text
							fontSize='nano'
							fontWeight='medium'
							color='background-color'>
							{t('scheduleCard.button')}
						</Text>
					</View>
				</View>
			</View>
		</Touchable>
	)
}
