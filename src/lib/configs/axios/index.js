import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    instance.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.authorization;
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) => console.log(error)
);

export const CancelToken = axios.CancelToken;

instance.defaults.timeout = 120000;

export default instance;
