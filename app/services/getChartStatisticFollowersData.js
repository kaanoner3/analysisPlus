import axios from "utils/axios"

async function getChartStatisticFollowersData(type) {
   const response = axios.get("api/user/statistic/followers/" + type)
   return response
}

export default getChartStatisticFollowersData
