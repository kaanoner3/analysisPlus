import axios from 'axios'

async function accessToken(grantType, clientID, clientSecret, accessToken) {
    console.log(accessToken)
  const params = {
    grant_type: grantType,
    client_id: clientID,
    client_secret: clientSecret,
    instagram_token: accessToken,
  };

  return axios.get('/oauth/v2/token', { params });
}

export default accessToken;
