import Eitri from 'eitri-bifrost'
import { Tracking } from 'eitri-shopping-demo-shared'

export const startTrackingService = async () => {
	try {
		Tracking.tryAutoConfigure()
	} catch (e) {
		console.error('Erro ao iniciar tracking service', e)
	}
}

export const sendPageView = async pageName => {
	Tracking.ga.gtag('event', 'page_view', {
		page_title: `[checkout] ${pageName}`,
		page_path: pageName
	})
}

export const setScreenView = async (screenName, screenClass = null) => {
	try {
		if (Eitri.exposedApis?.fb) {
			await Eitri.exposedApis.fb.currentScreen({ screen: screenName, screenClass: screenClass || screenName })
		}
	} catch (error) {
		console.log('Erro ao setar tela atual', error)
	}
}

export const logEvent = async (eventName, data) => {
	try {
		if (Eitri.exposedApis?.fb) {
			await Eitri.exposedApis.fb.logEvent({ eventName, data })
		}
	} catch (error) {
		console.log('Erro ao logar evento', error)
	}
}

export const crashLog = async message => {
	try {
		if (Eitri.exposedApis?.fb) {
			await Eitri.exposedApis.fb.crashLog({ message })
		}
	} catch (error) {
		console.log('Erro ao logar evento', error)
	}
}

export const crash = async () => {
	try {
		if (Eitri.exposedApis?.fb) {
			await Eitri.exposedApis.fb.crash()
		}
	} catch (error) {
		console.log('Erro ao logar evento', error)
	}
}
