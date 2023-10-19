import client from './core/client'

const API_URL = 'https://static.adbrix.io/front/coding-test'

export const getDailyReport = async () => {
  const endpoint = API_URL + '/event_1.json'
  const result = await client.get(endpoint)
  return result
}

export const getReferral = async () => {
  const endpoint = API_URL + '/event_3.json'
  const result = await client.get(endpoint)
  return result
}

export const getRegion = async () => {
  const endpoint = API_URL + '/event_4.json'
  const result = await client.get(endpoint)
  return result
}
