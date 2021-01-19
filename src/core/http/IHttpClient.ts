import {AxiosResponse} from "axios";

interface IHttpClient {
    baseUrl: string;
    fetch(endpoint: string, requestParams?: {[key: string]: string}): Promise<AxiosResponse>;
    addDefaultRequestParam(key: string, value: string): void;
    clearDefaultRequestParams(): void;
}

export default IHttpClient;
