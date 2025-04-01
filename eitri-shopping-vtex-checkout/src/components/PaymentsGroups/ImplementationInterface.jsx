import CreditCard from './CreditCard'
import BankInvoice from './BankInvoice'
import InstantPayment from './InstantPayment'
import { App } from 'eitri-shopping-vtex-shared'
import ExternalPayment from './ExternalPayment'

export default function ImplementationInterface(props) {
	const { groupName, paymentSystems } = props

	const PAYMENT_GROUPS_IMPLEMENTATION = {
		creditCardPaymentGroup: CreditCard,
		bankInvoicePaymentGroup: BankInvoice,
		instantPaymentPaymentGroup: InstantPayment
	}

	const externalPaymentsImplementation = App?.configs?.appConfigs.externalPayments ?? []

	const externalPaymentRc = externalPaymentsImplementation.find(
		externalPayment => externalPayment.externalGroupName === groupName
	)

	if ((!groupName || !PAYMENT_GROUPS_IMPLEMENTATION[groupName]) && !externalPaymentRc) {
		return null
	}

	if (externalPaymentRc) {
		return (
			<ExternalPayment
				paymentSystems={paymentSystems}
				groupName={groupName}
				externalPaymentRc={externalPaymentRc}
			/>
		)
	}

	const Implementation = PAYMENT_GROUPS_IMPLEMENTATION[groupName]

	/*prettier-ignore*/
	return React.createElement(Implementation, { paymentSystems, groupName })
}
