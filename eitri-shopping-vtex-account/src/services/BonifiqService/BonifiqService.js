import Eitri from 'eitri-bifrost'

const BONIFIQ_URL = 'https://api.bonifiq.com.br'
const TENANT = '4c86e8d8-bc1f-4f9e-9665-b3e5976e913f'
// TODO: adicionar em uma variavel de ambiente

export const login = async (email) => {

    const payload = {
        "Email": email,
        "Name": email,
        "UserId": email
    }

    try {
        const response = await Eitri.http.post(
            `${BONIFIQ_URL}/pub/widget/account/login`,
            payload,
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                }
            }
        )

        return response?.data
    } catch (error) {
        console.error('login: Error', error)
    }
};


export const getPoints = async (publicId) => {

    try {
        const response = await Eitri.http.get(
            `${BONIFIQ_URL}/pub/widget/customer/info`,
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                    'X-Bq-Customer': publicId
                }
            }
        )

        return response?.data
    } catch (error) {
        console.error('getPoints: Error', error)
    }

}

export const getObjectives = async (publicId) => {

    try {
        const response = await Eitri.http.get(
            `${BONIFIQ_URL}/pub/widget/objectives`,
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                    'X-Bq-Customer': publicId
                }
            }
        )

        return response?.data
    } catch (error) {
        console.error('getObjectives: Error', error)
    }

}

export const getRewards = async (publicId) => {

    try {
        const response = await Eitri.http.get(
            `${BONIFIQ_URL}/pub/widget/rewards`,
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                    'X-Bq-Customer': publicId
                }
            }
        )

        return response?.data
    } catch (error) {
        console.error('getRewards: Error', error)
    }
}

export const getTerms = async (publicId) => {

    try {
        const response = await Eitri.http.get(
            `${BONIFIQ_URL}/pub/widget/terms`,
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                    'X-Bq-Customer': publicId
                }
            }
        )

        return response?.data
    } catch (error) {
        console.error('getTerms: Error', error)
    }
}

export const getHistory = async (publicId, page = 1) => {

    try {
        const response = await Eitri.http.get(
            `${BONIFIQ_URL}/pub/widget/customer/history?page=${page}`,
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                    'X-Bq-Customer': publicId
                }
            }
        )

        return response?.data
    } catch (error) {
        console.error('getHistory: Error', error)
    }
}

export const rescuePoints = async (publicId, pointId) => {

    try {
        const response = await Eitri.http.post(
            `${BONIFIQ_URL}/pub/widget/rewards/redeem/${pointId}`,
            {},
            {
                headers: {
                    'X-Bq-Tenant': TENANT,
                    'X-Bq-Customer': publicId
                }
            }
        )
        return response?.data
    } catch (error) {
        console.error('login: Error', error)
    }
};
