import axios from 'axios';

export const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    // Develop
    return process.env.REACT_APP_LOCAL_DOMAIN;
  } else if (process.env.NODE_ENV === 'production') {
    // Production
    return process.env.REACT_APP_DOMAIN;
  }
};

export const isProduction = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  } else if (process.env.NODE_ENV === 'production') {
    return 'format=json';
  }
};

axios.defaults.baseURL = getBaseURL();
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default axios;
