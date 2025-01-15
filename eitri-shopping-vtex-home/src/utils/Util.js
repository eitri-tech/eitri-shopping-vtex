import { Vtex } from 'eitri-shopping-vtex-shared'

export const delay = async ms => {
	return new Promise((resolve, _reject) => setTimeout(resolve, ms))
}

export const formatPrice = (price, _locale, _currency) => {
	if (!price) return ''

	const locale = _locale || Vtex?.configs?.storePreferences?.locale || 'pt-BR'
	const currency = _currency || Vtex?.configs?.storePreferences?.currencyCode || 'BRL'

	return price.toLocaleString(locale, { style: 'currency', currency: currency })
}
