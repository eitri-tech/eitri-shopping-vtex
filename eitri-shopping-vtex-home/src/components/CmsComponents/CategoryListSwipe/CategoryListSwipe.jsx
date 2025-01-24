import { resolveNavigation } from '../../../services/NavigationService'
import CategoryPageItem from './components/CategoryPageItem'

export default function CategoryListSwipe(props) {
	const { data } = props

	const openItem = item => {
		resolveNavigation(item.path, item.title)
	}

	return (
		<View
			paddingHorizontal='large'
			direction='column'
			gap={12}>
			{data?.content &&
				data?.content?.map(item => (
					<CategoryPageItem
						item={item}
						goToItem={openItem}
					/>
				))}
		</View>
	)
}
