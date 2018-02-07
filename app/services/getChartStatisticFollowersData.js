import axios from "axios"

async function getChartStatisticFollowersData(token, type) {
   const params = { access_token: token }
   const response = axios.get("api/user/statistic/followers/" + type, { params })
   return response
}

export default getChartStatisticFollowersData
