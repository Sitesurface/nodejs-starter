import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse {
  data: any;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string, headers?: Record<string, string>) {
    // Create an Axios instance with the specified base URL and headers
    this.client = axios.create({
      baseURL,
      headers,
    });
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse | ApiError> {
    try {
      // Make a GET request to the specified URL using the Axios instance
      const response = await this.client.get(url, config);

      // Return a successful response with the data and status code
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      // If the request fails, return an error with the error message and status code
      return {
        message: error.message,
        status: error.response?.status ?? 500,
      };
    }
  }

  public async post(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse | ApiError> {
    try {
      // Make a POST request to the specified URL using the Axios instance
      const response: AxiosResponse = await this.client.post(url, data, config);

      // Return a successful response with the data and status code
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      // If the request fails, return an error with the error message and status code
      return {
        message: error.message,
        status: error.response?.status ?? 500,
      };
    }
  }

  // Add methods for other HTTP methods as needed (e.g. put(), patch(), delete())
}

export default ApiClient;
