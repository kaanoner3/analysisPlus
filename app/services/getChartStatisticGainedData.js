//import { axios } from "./../utils/axios"
import axios  from "utils/axios"

async function getChartStatisticGainedData( type) {
   
   const response = axios.get("api/user/statistic/gained-followers/" + type)
   return response
}

export default getChartStatisticGainedData
