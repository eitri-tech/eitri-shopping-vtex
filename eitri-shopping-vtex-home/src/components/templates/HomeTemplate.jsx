import { getMappedComponent } from '../../utils/getMappedComponent'

export default function HomeTemplate(props) {
	const { cmsContent, reloadKey } = props

	return (
		<View
			paddingBottom='large'
			paddingTop='small'
			direction='column'
			gap={22}>
			{cmsContent?.map(content => getMappedComponent(content, reloadKey))}
		</View>
	)
}
