import Eitri from 'eitri-bifrost'

export const PAGES = {
	HOME: '/Home',
	SIGNIN: '/Login/SignIn',
	SIGNUP: '/Login/SignUp',
	PASSWORD_RESET: '/Login/PasswordReset',
	PASSWORD_RESET_CODE: '/Login/PasswordResetCode',
	PASSWORD_RESET_NEW_PASS: '/Login/PasswordResetNewPass',
	LOGIN: '/Login/Login',
	EDIT_PROFILE: '/EditProfile',
	ORDER_LIST: '/OrderList',
	WISH_LIST: '/WishList'
}

export const openProduct = async product => {
	try {
		Eitri.nativeNavigation.open({
			slug: 'pdp',
			initParams: { product }
		})
	} catch (e) {
		console.error('navigate to cart: Error trying to open product', e)
	}
}

export const navigate = (page, state = {}, replace = false) => {
	return Eitri.navigation.navigate({ path: page, state, replace })
}
