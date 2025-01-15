import Eitri from 'eitri-bifrost'

export const openCart = async cart => {
	try {
		Eitri.nativeNavigation.open({
			slug: 'eitri-shopping-demo-cart',
			initParams: { orderFormId: cart?.orderFormId }
		})
		console.log('Navega para carrinho')
	} catch (e) {
		console.error('navigate to cart: Error trying to open cart', e)
	}
}

export const openMenu = async () => {
	try {
		// TODO: Adicionar navegaçao para o carrinho
		// Eitri.nativeNavigation.open({
		// 	slug: 'eitri-shopping-store-cart',
		// 	initParams: { route: 'Cart', orderFormId: cart?.orderFormId, cart: cart }
		// })
		console.log('Navega para Menu')
	} catch (e) {
		console.error('navigate to Menu: Error trying to open Menu', e)
	}
}

export const openProduct = async product => {
	try {
		Eitri.nativeNavigation.open({
			slug: 'eitri-shopping-demo-pdp',
			// workspaceId: 'e9f0cad3-5101-475a-8074-b6633497060e',
			initParams: { product }
		})
		// console.log('Navega para PDP', product)
	} catch (e) {
		console.error('navigate to PDP: Error trying to open PDP', e)
	}
}

export const openProductById = async productId => {
	try {
		Eitri.nativeNavigation.open({
			slug: 'eitri-shopping-demo-pdp',
			// workspaceId: 'e9f0cad3-5101-475a-8074-b6633497060e',
			initParams: { productId }
		})
		console.log('Navega para PDP')
	} catch (e) {
		console.error('navigate to PDP: Error trying to open PDP', e)
	}
}

export const normalizePath = path => {
	let pathComponents = decodeURIComponent(path).split('?')
	let pathData = pathComponents[0].split('/').filter(Boolean)
	let queryParams = new URLSearchParams(pathComponents[1])
	let normalizedData = { facets: [] }

	if (queryParams.has('map')) {
		let mapKeys = queryParams.get('map').split(',')
		pathData.forEach((value, index) => {
			if (mapKeys[index] === 'ft') {
				normalizedData.query = value
			} else {
				normalizedData.facets.push({
					key: mapKeys[index],
					value: value
				})
			}
		})
	} else {
		// Handle paths without 'map' query param
		pathData.forEach((value, index) => {
			normalizedData.facets.push({
				key: `category-${index + 1}`,
				value: value
			})
		})
	}

	for (let [key, value] of queryParams.entries()) {
		if (key !== 'map') {
			normalizedData[key] = value
		}
	}

	return normalizedData
}

export const openBrand = (brand, title) => {
	const facets = [{ key: 'brand', value: brand }]
	Eitri.navigation.navigate({ path: 'ProductCatalog', state: { params: { facets }, title: title || '' } })
}

export const resolveNavigation = (path, title) => {
	const normalizedPath = normalizePath(path)
	Eitri.navigation.navigate({ path: 'ProductCatalog', state: { params: normalizedPath, title: title || '' } })
}
