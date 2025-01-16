import { Spacing, Divisor } from 'eitri-shopping-vtex-components-shared'
import { useTranslation } from 'eitri-i18n'

export default function Description(props) {
	const { description } = props

	const [collapsed, setCollapsed] = useState(false)
	const [showMore, setShowMore] = useState(false)
	const isLongDescription = description?.length > 100

	const { t } = useTranslation()
	
	const toggleCollapsedState = () => {
		setCollapsed(!collapsed)
	}

	const toggleShowMore = () => {
		setShowMore(!showMore)
	}

	function removeTags(description) {
		const regex = /<(strong|h2)>(.*?)<\/\1>/g

		let descriptionTitle = []
		let match = ''

		while ((match = regex.exec(description)) !== null) {
			descriptionTitle.push(match[2])
		}

		const modifiedDescription = description.replace(regex, '')

		return {
			descriptionTitle,
			modifiedDescription
		}
	}
	const result = removeTags(description)

	return (
		<View>
			<Touchable onPress={() => toggleCollapsedState()}>
				<View
					display='flex'
					alignItems='center'
					justifyContent='between'
					width='100%'>
					<Text
						fontSize='large'
						fontWeight='bold'>
						{t('description.txtDescription')}
					</Text>
					<Icon
						iconKey={collapsed ? 'chevron-down' : 'chevron-up'}
						width={26}
					/>
				</View>
			</Touchable>
			{!collapsed && (
				<View>
					<Text
						fontWeight='bold'
						marginVertical='large'>
						{result.descriptionTitle}
					</Text>
					<Text>
						{showMore || !isLongDescription
							? result?.modifiedDescription
							: `${result?.modifiedDescription.substring(0, 220)}...`}
					</Text>
					{isLongDescription && (
						<Touchable onPress={toggleShowMore}>
							<Text
								color='support-01'
								textDecoration='underline'
								fontWeight='bold'
								marginTop='nano'>
								{showMore ? t('description.labelSeeLess') : t('description.labelSeeMore')}
							</Text>
						</Touchable>
					)}
					<Spacing height='20px' />
				</View>
			)}
			<Divisor />
		</View>
	)
}
