// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { GetWeatherForecastResponse } from './types.gen';

export class WeatherForecastService {
    /**
     * @returns WeatherForecast OK
     * @throws ApiError
     */
    public static get(): CancelablePromise<GetWeatherForecastResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/WeatherForecast'
        });
    }
    
}