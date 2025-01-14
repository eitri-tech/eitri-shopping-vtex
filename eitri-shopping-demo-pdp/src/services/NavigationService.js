import Eitri from 'eitri-bifrost'

export const openCart = async cart => {
	try {
		Eitri.nativeNavigation.open({
			slug: 'eitri-shopping-demo-cart',
			initParams: { orderFormId: cart?.orderFormId }
		})
	} catch (e) {
		console.error('navigate to cart: Error trying to open cart', e)
	}
}

export const openProduct = async (product) => {
	try {
		Eitri.nativeNavigation.open({
			slug: 'eitri-shopping-demo-pdp',
			initParams: { product: product }
		})
	} catch (e) {
		console.error('navigate to cart: Error trying to open cart', e)
	}
}
