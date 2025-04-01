import ImplementationInterface from '../PaymentsGroups/ImplementationInterface'
import { paymentSystemResolver } from '../../utils/paymentSystemResolver'
import { useLocalShoppingCart } from '../../providers/LocalCart'

export default function PaymentMethods(props) {

	const { cart } = useLocalShoppingCart()

	const paymentSystems = paymentSystemResolver(cart)

	return (
		<View
			width='100%'
			gap={16}
			direction='column'>
			{paymentSystems?.map(system => {
				return (
					<ImplementationInterface
						key={system.groupName}
						groupName={system.groupName}
						paymentSystems={system.paymentSystems}
					/>
				)
			})}
		</View>
	)
}
