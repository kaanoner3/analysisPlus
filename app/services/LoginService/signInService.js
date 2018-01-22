import axios from "axios";

async function SignInService(token) {
  let params = new FormData();
  params.append("access_token", token);
  const response = axios.post("api/login", params);

  return response
}

export default SignInService;
