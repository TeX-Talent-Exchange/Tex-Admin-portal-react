import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Request intercepter to add additional headers to every request sent to api
axiosClient.interceptors.request.use((req) => {
  if (req.url !== "/auth/login" || req.url !== "/auth/changePassword") {
    const idToken = JSON.parse(localStorage.getItem("persist:auth"))
    ["idToken"].replace('"', "")
      .replace('"', "");
    req.headers.Authorization = idToken;
    return req;
  }
  return req;
});

axiosClient.interceptors.response.use((res) => {
  if (res.headers.authorization) {
    const object = JSON.parse(localStorage.getItem("persist:auth"));
    object.idToken = `"${res.headers.authorization}"`
    localStorage.setItem("persist:auth", JSON.stringify(object));
  }
  return res;
}, error => {
  if (error.response.status === 401) {
    const object = JSON.parse(localStorage.getItem('persist:auth'))
    object.idToken = ""
    object.authUser = ""
    localStorage.setItem('persist:auth', JSON.stringify(object))
  }
  return Promise.reject(error)
})

export default axiosClient;
