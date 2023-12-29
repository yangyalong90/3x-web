import axios from 'axios';
import { Notification } from 'element-ui';

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

const BASE_URL = 'mng';

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';


// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 60000;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (!config.baseURL) {
      config.baseURL = BASE_URL;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status !== 200) {
      handleError(response);
      return Promise.reject(response);
    }
    const data = response.data;
    if (data.code && data.code !== '1') {
      handleError(response);
      return Promise.reject(response);
    }
    return data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


const handleError = function(response) {
  if (response.status !== 200) {
    Notification({
      type: 'error',
      message: response.data,
    })
    return;
  }
  const data = response.data;
  if (data.code === '0') {
    Notification({
      type: 'error',
      message: data.msg,
    })
    return;
  }
}


export default instance;
