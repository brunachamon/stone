import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
});

function setAuthToken(token) {
  instance.defaults.headers.common["Authorization"] = "";
  delete instance.defaults.headers.common["Authorization"];

  if (token) {
    instance.defaults.headers.common["Authorization"] = `${token}`;
  }
}

export default instance;
export { setAuthToken };
