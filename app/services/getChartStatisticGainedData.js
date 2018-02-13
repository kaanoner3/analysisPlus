//import { axios } from "./../utils/axios"
import axios  from "utils/axios"

async function getChartStatisticGainedData(token, type) {
   
   const response = axios.get("api/user/statistic/gained-followers/" + type)
   console.log('service respoınse', response)
   return response
}

export default getChartStatisticGainedData
