
import { AxiosInstance } from 'axios';
import { HttpClient } from './http-client/http-client';

export class HttpClientService {
    protected getSpecification() {
        const httpClient: AxiosInstance = HttpClient.getInstance().getSpecification();

        return httpClient;
    }
}
