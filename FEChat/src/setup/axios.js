import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_BE
});


// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

instance.defaults.withCredentials = true

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;