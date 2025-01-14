import Eitri from 'eitri-bifrost'

export const navigateToCheckout = orderFormId => {
  console.log('orderFormId===>', orderFormId)
	Eitri.nativeNavigation.open({
		slug: 'eitri-shopping-demo-checkout',
		initParams: { orderFormId }
	})
}
