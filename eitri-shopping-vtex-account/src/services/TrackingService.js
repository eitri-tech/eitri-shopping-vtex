import { Tracking } from 'eitri-shopping-vtex-shared'

export const sendPageView = async pageName => {
  try {
    Tracking.ga.logScreenView(pageName)
  } catch (e) {}
}
