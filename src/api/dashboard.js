// import client from './core/client'

// const API_URL = ''

export const getDailyReport = async () => {
  // const endpoint = API_URL + '/event_1.json'
  // const result = await client.get(endpoint)
  const { event_1 } = await import('./sample/dashboard')
  return event_1
}

export const getReferral = async () => {
  const { event_3 } = await import('./sample/dashboard')
  return event_3
}

export const getRegion = async () => {
  const { event_4 } = await import('./sample/dashboard')
  return event_4
}
