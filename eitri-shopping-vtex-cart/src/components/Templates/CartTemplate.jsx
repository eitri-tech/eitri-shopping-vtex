import Eitri from 'eitri-bifrost'
import { Loading } from 'eitri-shopping-vtex-components-shared'
import emptyCart from '../../assets/images/cart-01.svg'
import EmptyCart from '../EmptyCart/EmptyCart'
import Cart from '../Cart/Cart'
import { useTranslation } from 'eitri-i18n'

export default function CartTemplate(props) {
	const {
		cart,
		backPage,
		iconAlert,
		textAlert,
		cartIsLoading,
		onChangeQuantityItem,
		handleRemoveCartItem,
		handleSaveFavorite,
		goToCheckout,
		appIsLoading,
		locale, currency
	} = props

	const { t } = useTranslation()

	const onBack = () => {
		if (backPage) {
			Eitri.navigation.back(backPage)
		} else {
			Eitri.navigation.back()
		}
	}

	return (
		<View grow='1'>
			{cart?.items.length > 0 ? (
				<Cart
					cart={cart}
					iconAlert={iconAlert}
					textAlert={textAlert}
					cartIsLoading={cartIsLoading}
					onChangeQuantityItem={onChangeQuantityItem}
					handleRemoveCartItem={handleRemoveCartItem}
					handleSaveFavorite={handleSaveFavorite}
					goToCheckout={goToCheckout}
					locale={locale}
					currency={currency}
				/>
			) : !cartIsLoading && !appIsLoading ? (
				<EmptyCart
					icon={emptyCart}
					buttonPress={() => onBack()}
					buttonLabel={t('cartTemplate.labelContinue')}
				/>
			) : (
				<View marginTop='display' display='flex' alignItems='center' justifyContent='center'>
					<Loading />
				</View>
			)}
		</View>
	)
}
