import axios from 'axios'

async function  getProfileData(token) {
    const params = {
        access_token: token
    }
 return axios.get('api/user/base-detail',{params})
 .then(response =>{return( response.data)})
}

export default getProfileData