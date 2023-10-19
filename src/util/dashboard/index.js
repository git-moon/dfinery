class DashboardUtil {
  static segment = (payload) => {
    const headers = payload?.headers || []
    const rows = payload?.rows || []

    // 헤더가 없으면 중단
    if (headers.length < 1) {
      return
    }

    const result = { rows }

    // segment와 metric을 분리해서 정리한다.
    headers.forEach((header) => {
      const propertyType = header.property_type
      const temp = { ...header, data: [] }

      let temps = result[propertyType] || []
      temps = [...temps, temp]
      result[propertyType] = temps
    })

    return result
  }
}

export default DashboardUtil
