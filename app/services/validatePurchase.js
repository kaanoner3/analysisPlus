import axios from "utils/axios"

function validatePurchase(transactionReceipt, apple_store_id, type = null) {
   const params = new FormData()
   params.append("receipt", transactionReceipt)
   params.append("apple_store_id", apple_store_id)
   if (type) {
      params.append("type", type)
   }
   return axios.post("api/package/buy", params)
}

export default validatePurchase
