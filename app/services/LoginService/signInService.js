import axios from "axios";

export default function SignInService(token) {
  let params = new FormData();
  params.append("access_token", token);
    axios
    .post("api/login", params)
    .then(response => console.log(response));
}
