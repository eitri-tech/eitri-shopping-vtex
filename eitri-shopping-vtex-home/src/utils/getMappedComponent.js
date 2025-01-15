import MultipleImageBanner from '../components/Banner/MultipleImageBanner'
import ProductShelf from '../components/ProductShelf/ProductShelf'
import ProductTiles from '../components/ProductTiles/ProductTiles'
import CategoryShelf from '../components/CategoryShelf/CategoryShelf'
import ScheduleCardShelf from '../components/Schedule/ScheduleCardShelf'
import CategoryTree from '../components/CategoryTree/CategoryTree'
import CategoryTiles from '../components/CategoryTiles/CategoryTiles'
import BlogPostShelf from '../components/Blog/BlogPostShelf.jsx'
import LastSeenProducts from '../components/LastSeenProducts/LastSeenProducts'
import CategoryListSwipe from '../components/CategoryListSwipe/CategoryListSwipe'

const componentMap = {
	MultipleImageBanner: MultipleImageBanner,
	ProductTiles: ProductTiles,
	ProductShelf: ProductShelf,
	CategoryShelf: CategoryShelf,
	WordPressCardList: BlogPostShelf,
	ScheduleCardShelf: ScheduleCardShelf,
	CategoryTree: CategoryTree,
	CategoryTiles: CategoryTiles,
	LastSeenProducts: LastSeenProducts,
	CategoryListSwipe: CategoryListSwipe
}

const shouldReloadOnResume = componentName => {
	const componentsToReload = ['LastSeenProducts']
	return componentsToReload.includes(componentName)
}

export const getMappedComponent = (content, reloadKey) => {
	const Component = componentMap[content.name]

	if (!Component) {
		console.error(`Component ${content.name} does not exist in the component map.`)
		return null
	}

	// console.log('Component >>>>>>>>>', content.name)
	const key = content.id + (shouldReloadOnResume(content.name) ? reloadKey : '')

	try {
		return (
			<Component
				key={key}
				data={content.data}
			/>
		)
	} catch (error) {
		console.error(`Error rendering component ${content.name}:`, error)
		return null
	}
}
