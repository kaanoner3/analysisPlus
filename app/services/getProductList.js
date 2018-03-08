import axios from "utils/axios"

export default function getProductList() {
    return axios.get("api/package/subscription-list")
}

