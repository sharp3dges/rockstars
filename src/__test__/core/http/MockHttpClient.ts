/* eslint-env jest */

import axios, { AxiosResponse } from 'axios';

import IHttpClient from "../../../core/http/IHttpClient";
import WebServiceError from "../../../core/errors/WebServiceError";

jest.mock('axios');

class MockHttpClient implements IHttpClient {
    baseUrl: string;
    data: {[key: string]: (AxiosResponse | WebServiceError)} = {};

    constructor() {
        this.baseUrl = 'baseUrl';
    }

    setupResponse(response: AxiosResponse | WebServiceError, forEndpoint: string) {
        this.data[forEndpoint] = response;
    }

    async fetch(endpoint: string, requestParams: { [p: string]: any }): Promise<AxiosResponse> {
        const result = this.data[endpoint];
        if (result instanceof WebServiceError) {
            throw result;
        }
        return result;
    }

    addDefaultRequestParam(key: string, value: string): void {

    }

    clearDefaultRequestParams(): void {

    }
}

export default MockHttpClient;
