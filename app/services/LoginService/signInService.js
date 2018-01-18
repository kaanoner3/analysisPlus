import axios from "axios";

export default function signInService(token) {
  let params = new FormData();
  params.append("access_token", token);
  return axios
    .post("api/login", params)
    .then(response => console.log(response));
}
