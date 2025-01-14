import { Tracking } from 'eitri-shopping-demo-shared'

export const startTrackingService = async () => {
	try {
		Tracking.tryAutoConfigure()
	} catch (e) {}
}

export const sendPageView = async pageName => {
	Tracking.ga.gtag('event', 'page_view', {
		page_title: `[account] ${pageName}`,
		page_path: pageName
	})
}
