import axios from "axios"

async function SignInService(token,result) {
  
  let params = new FormData();
  params.append("access_token", token);
  params.append("username",result.username)
  params.append("password",result.password)
  const response = axios.post("api/login", params);

  return response
}

export default SignInService;
