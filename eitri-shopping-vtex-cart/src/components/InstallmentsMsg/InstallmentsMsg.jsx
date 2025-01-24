import AlertItem from "../AlertItem/AlertItem";
import { useTranslation } from 'eitri-i18n'
import {useLocalShoppingCart} from "../../providers/LocalCart";

export default function InstallmentsMsg (props) {

  const { cart } = useLocalShoppingCart()
  const { t } = useTranslation()

  const findMaxInstallments = installmentOptions => {
    let maxInstallments = 0

    installmentOptions?.forEach(option => {
      option.installments.forEach(installment => {
        if (installment.count > maxInstallments) {
          maxInstallments = installment.count
        }
      })
    })

    return maxInstallments
  }

  const maxInstallments = findMaxInstallments(cart?.paymentData?.installmentOptions)

  return (
    <>
      {maxInstallments > 1 && (
        <AlertItem
          iconAlert={'credit-card'}
          textAlert={`${t('cart.labelInstalmentUntil')} ${maxInstallments}x`}
        />
      )}
    </>

  )
}
