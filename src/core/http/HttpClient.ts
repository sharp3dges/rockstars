import IHttpClient from "./IHttpClient";
import axios, {AxiosResponse} from "axios";

class HttpClient implements IHttpClient {
    baseUrl: string;
    private defaultRequestParams: {[key: string]: string};

    constructor(baseUrl: string = 'http://localhost:3001', defaultRequestParams: {[key: string]: string} = {}) {
        this.baseUrl = baseUrl;
        this.defaultRequestParams = defaultRequestParams;
    }

    async fetch(endpoint: string, params: { [p: string]: any } = {}, headers: {[key: string]: string} = {}): Promise<AxiosResponse> {
        let url = `${this.baseUrl}/${endpoint}`;

        let requestHeaders = {
            ...this.defaultRequestParams,
            ...headers,
        };

        if (Object.keys(params).length) {
            url += '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
        }
        return axios.get(url, { headers: requestHeaders }).catch();
    }

    addDefaultRequestParam(key: string, value: string): void {
        this.defaultRequestParams[key] = value;
    }

    clearDefaultRequestParams(): void {
        this.defaultRequestParams = {};
    }

}

export default HttpClient;
