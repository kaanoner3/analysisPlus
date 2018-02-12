import axios from "axios"

async function getChartStatisticGainedData(token, type) {
   const params = { access_token: token }
   const response = axios.get("api/user/statistic/gained-followers/" + type, { params })
   return response
}

export default getChartStatisticGainedData
