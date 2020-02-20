import axios, {AxiosInstance} from 'axios';
import {httpConfig} from './http.config';

export class HttpClient {
  private static instance: HttpClient;
  private constructor() {
  }

  public static getInstance() {
      if (!HttpClient.instance) {
          HttpClient.instance = new HttpClient();
      }
      return HttpClient.instance;
  }

  public getSpecification(): AxiosInstance {
      return axios.create(httpConfig.getInstanceConfig());
  }
}
