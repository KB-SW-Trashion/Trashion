import { getCookie } from 'cookies-next';

const tokenConfig = (type = 'json') => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (type !== 'json') {
    config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }

  const token = getCookie('access_token');
  // Headers

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
export default tokenConfig;
