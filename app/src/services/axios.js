import axios, { HttpStatusCode } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ADDRESS,
});

const setupAxiosErrorInterceptor = (navigate, onError) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        error.response.status === HttpStatusCode.Unauthorized
      ) {
        onError?.();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );
};

function setAuthToken(token) {
  instance.defaults.headers.common["Authorization"] = "";
  delete instance.defaults.headers.common["Authorization"];

  if (token) {
    instance.defaults.headers.common["Authorization"] = `${token}`;
  }
}

export default instance;
export { setAuthToken, setupAxiosErrorInterceptor };
