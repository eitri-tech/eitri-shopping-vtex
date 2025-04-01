import Eitri from 'eitri-bifrost'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { clearCart } from '../services/cartService'

export default function ExternalProviderOrder(props) {
	const PAGE = 'External Provider Order'

	useEffect(() => {
		if (props.location?.state?.paymentResult) {
			const paymentResult = props.location?.state?.paymentResult

			const paymentAuthorizationApp = paymentResult.paymentAuthorizationAppCollection[0]
			const url = paymentAuthorizationApp.appPayload

			openProvider(url)

			Eitri.navigation.setOnResumeListener(() => checkOrderStatus())
		}
	}, [props.location?.state?.paymentResult])

	const openProvider = async url => {
		Eitri.openBrowser({
			url: url,
			inApp: true
		})
	}

	async function checkOrderStatus() {
		try {
			console.log('checkOrderStatus')
			const cart = await Vtex.cart.getCartIfExists()

			if (cart?.items?.length > 0) {
				Eitri.navigation.navigate({path: 'ExternalProviderOrderFinished', replace: true})
			} else {
				clearCart()
				Eitri.navigation.navigate({path: 'OrderCompleted', state: {
					orderValue: cart.value,
					orderId: props.location?.state?.paymentResult?.orderId
				}, replace: true})
			}
		} catch (error) {

		}
	}

	return (
		<Window
			topInset
			bottomInset></Window>
	)
}
