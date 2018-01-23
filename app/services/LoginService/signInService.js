import axios from "axios"

<<<<<<< HEAD
async function SignInService(token) {
  console.log('service',token)
  let params = new FormData();
  params.append("access_token", token);
  const response = axios.post("api/login", params);

  return response
=======
export default function SignInService(token) {
    let params = new FormData()
    params.append("access_token", token)
    axios.post("api/login", params).then(response => console.log(response))
>>>>>>> 4793eb0842ac953cb2149b947f407f53e2dd2cde
}

export default SignInService;
