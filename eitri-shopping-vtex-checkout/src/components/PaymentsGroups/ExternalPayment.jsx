import GroupsWrapper from './GroupsWrapper'
import { useLocalShoppingCart } from '../../providers/LocalCart'

export default function ExternalPayment(props) {
	const { cart, selectedPaymentData, setSelectedPaymentData } = useLocalShoppingCart()

	const { paymentSystems, groupName, externalPaymentRc } = props

	const onSelectThisGroup = () => {
		const paymentSystem = paymentSystems[0]

		setSelectedPaymentData({
			groupName: groupName,
			paymentSystem: paymentSystem,
			payload: {
				group: paymentSystem.groupName,
				installments: 1,
				installmentsInterestRate: 0,
				installmentsValue: cart.value,
				paymentSystem: paymentSystem.id,
				paymentSystemName: paymentSystem.name,
				referenceValue: cart.value,
				value: cart.value
			},
			isReadyToPay: true
		})
	}

	return (
		<GroupsWrapper
			title={externalPaymentRc.name}
			icon={''}
			imageUrl={externalPaymentRc.imageUrl}
			onPress={onSelectThisGroup}
			isChecked={groupName === selectedPaymentData?.groupName}>
			{externalPaymentRc.description && <Text fontSize='nano'>{externalPaymentRc.description}</Text>}
		</GroupsWrapper>
	)
}
