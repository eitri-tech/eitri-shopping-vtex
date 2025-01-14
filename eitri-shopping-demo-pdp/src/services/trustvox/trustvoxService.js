import Eitri from 'eitri-bifrost'

const TRUSTVOX_URL = 'https://trustvox.com.br'
const STORE_ID = '121771'

export const getReviews = async (page, productId, productName) => {
	try {
		const response = await Eitri.http.get(
			`${TRUSTVOX_URL}/widget/opinions?code=${productId}&store_id=${STORE_ID}&url=https%3A%2F%2Fwww.toymania.com.br%2F${productName}%2Fp&name=${productName}&page=${page}&per=4&order_by=-created_at`,
			{
				headers: {
					'accept': 'application/vnd.trustvox-v2+json',
					'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
					'cache-control': 'no-cache',
					'origin': 'https://www.toymania.com.br',
					'pragma': 'no-cache',
					'priority': 'u=1, i',
					'referer': 'https://www.toymania.com.br/',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'cross-site'
				}
			}
		)
		return response?.data
	} catch (error) {
		if (error?.response?.data?.error.includes('404: not found')) {
			console.log('getReviews: Nova tentativa', error?.response?.data?.error)
			console.log(
				'getReviews: URL',
				`${TRUSTVOX_URL}/widget/opinions?order_by=-created_at&page=${page}&per=4&code=${productId}&store_id=${STORE_ID}`
			)
			try {
				let response = await Eitri.http.get(
					`${TRUSTVOX_URL}/widget/opinions?code=${productId}&store_id=${STORE_ID}&url=https%3A%2F%2Fwww.toymania.com.br%2F${productName}%2Fp&name=${productName}&page=${page}&per=4&order_by=-created_at`,
					{
						headers: {
							'accept': 'application/vnd.trustvox-v2+json',
							'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
							'cache-control': 'no-cache',
							'origin': 'https://www.toymania.com.br',
							'pragma': 'no-cache',
							'priority': 'u=1, i',
							'referer': 'https://www.toymania.com.br/',
							'sec-fetch-mode': 'cors',
							'sec-fetch-site': 'cross-site'
						}
					}
				)
				return response?.data
			} catch (retryError) {
				console.error('getReviews: Retry Error', retryError)
				return null // ou qualquer valor padrão que faça sentido
			}
		} else {
			console.error('getReviews: Error', error)
			return null // ou qualquer valor padrão que faça sentido
		}
	}
}

export const getReviewsRate = async listProductId => {
	const productParams = listProductId.map(id => `codes[]=${id}`).join('&')

	const response = await Eitri.http.get(
		`${TRUSTVOX_URL}/widget/shelf/v2/products_rates?${productParams}&store_id=${STORE_ID}`
	)

	return response?.data
}
