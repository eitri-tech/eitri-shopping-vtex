import { Tracking } from 'eitri-shopping-vtex-shared'

export const startTrackingService = async () => {
	try {
		Tracking.tryAutoConfigure()
	} catch (e) {}
}

export const sendPageView = async pageName => {
	Tracking.ga.gtag('event', 'page_view', {
		page_title: `[cart] ${pageName}`,
		page_path: pageName
	})
}

export const crashLog = (message, error) => {}
