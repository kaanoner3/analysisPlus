import axios from "utils/axios"

async function getChartStatisticLostedData(type) {
   const response = axios.get("api/user/statistic/losted-followers/" + type)
   return response
}

export default getChartStatisticLostedData
