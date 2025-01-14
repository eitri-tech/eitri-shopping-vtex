import ImplementationInterface from '../PaymentsGroups/ImplementationInterface'

export default function PaymentMethods(props) {
	const { paymentSystems } = props
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
