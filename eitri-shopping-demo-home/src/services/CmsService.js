import { Vtex } from 'eitri-shopping-vtex-shared'
import Eitri from 'eitri-bifrost'

export const getCmsContent = async (dataCms = {}) => {
	try {
		const { faststore } = Vtex.configs
		const { contentType, pageName } = dataCms

		const cachedPage = await loadPageFromCache(faststore, contentType, pageName)

		if (cachedPage) {
			loadVtexCmsPage(faststore, contentType, pageName)
				.then(page => {
					if (page) {
						savePageInCache(faststore, contentType, pageName, page)
					}
				})
				.catch(e => {})

			return cachedPage
		}

		const page = await loadVtexCmsPage(faststore, contentType, pageName)
		if (page) {
			savePageInCache(faststore, contentType, pageName, page)
			return { sections: page.sections, settings: page.settings }
		} else {
			return null
		}

		// const { providerInfo } = await Eitri.environment.getRemoteConfigs()
		//
		// if (providerInfo.wakeCmsUrl) {
		// 	const sections = await getWakeContent(providerInfo.wakeCmsUrl)
		// 	const result = sections?.map(section => {
		// 		return { ...section, provider: PROVIDER.WAKE }
		// 	})
		// 	return { sections: result || null, settings: {} }
		// } else if (providerInfo.decoCms || providerInfo.decoCmsUrl) {
		// 	const sections = await getDecoContent(providerInfo.decoCms || providerInfo.decoCmsUrl)
		// 	const result = sections?.map(section => {
		// 		return { ...section, provider: PROVIDER.DECO }
		// 	})
		// 	return { sections: result || null, settings: {} }
		// } else {
		// 	const cachedPage = await loadPageFromCache(providerInfo.faststore, dataCms.contentType, dataCms.pageName)
		//
		// 	if (cachedPage) {
		// 		loadVtexCmsPage(providerInfo.faststore, dataCms.contentType, dataCms.pageName)
		// 			.then(page => {
		// 				if (page) {
		// 					savePageInCache(providerInfo.faststore, dataCms.contentType, dataCms.pageName, page)
		// 				}
		// 			})
		// 			.catch(e => {})
		//
		// 		return cachedPage
		// 	}
		//
		// 	const page = await loadVtexCmsPage(providerInfo.faststore, dataCms.contentType, dataCms.pageName)
		// 	if (page) {
		// 		savePageInCache(providerInfo.faststore, dataCms.contentType, dataCms.pageName, page)
		// 		return { sections: page.sections, settings: page.settings }
		// 	} else {
		// 		return null
		// 	}
		// }
	} catch (e) {
		console.error('Error trying get content', e)
	}

	return null
}

export const loadVtexCmsPage = async (faststore, contentType, pageName) => {
	const result = await Vtex.cms.getPagesByContentTypes(faststore, contentType)
	return result.data.find(item => item.name?.toLowerCase() === pageName?.toLowerCase())
}

export const loadPageFromCache = async (faststore, contentType, pageName) => {
	try {
		const cacheKey = `${faststore}_${contentType}_${pageName}`
		const content = await Eitri.sharedStorage.getItemJson(cacheKey)
		if (!content) return

		const inputDate = new Date(content.cachedIn)
		const currentDate = new Date()
		const differenceInMs = currentDate - inputDate
		const twentyFourHoursInMs = 86400000
		if (differenceInMs > twentyFourHoursInMs) {
			console.log('Cache expirado, buscando novo...')
			return null
		}
		return content
	} catch (error) {
		console.error('Error trying load from cache', error)
		return null
	}
}

export const savePageInCache = async (faststore, contentType, pageName, page) => {
	try {
		const cacheKey = `${faststore}_${contentType}_${pageName}`
		console.log('Salvando no cache...', cacheKey)
		Eitri.sharedStorage.setItemJson(cacheKey, { cachedIn: new Date().toISOString(), ...page })
	} catch (error) {
		console.error('Error trying save in cache', error)
	}
}

export const getDecoContent = async pageName => {
	const result = await Eitri.http.get(pageName)
	return result.data.props.sections
}

export const getWakeContent = async pageName => {
	const result = await Eitri.http.get(pageName)
	return result.data.sections
}