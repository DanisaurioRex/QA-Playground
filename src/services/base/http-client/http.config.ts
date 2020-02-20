import { AxiosRequestConfig } from 'axios';
import config = require('config');

export const httpConfig = {
  getInstanceConfig(): AxiosRequestConfig {
    return {
      baseURL: config.get('url'),
      responseType: 'json',
      auth: {
        password: config.get('password'),
        username: config.get('user_name'),
      },
    };
  },
};
