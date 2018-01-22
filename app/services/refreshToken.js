import { axios } from 'config/axios';
import store from '../store';

async function refreshTokenService() {
  const currentStore = store.getState();
    console.log('current-store',currentStore)
  const params = {
    grant_type: 'refresh_token',
    client_id: currentStore.auth.clientID,
    client_secret: currentStore.auth.clientSecret,
    refresh_token: currentStore.auth.refreshToken,
  };

  return axios.get('/oauth/v2/token', { params });
}

export default refreshTokenService;
