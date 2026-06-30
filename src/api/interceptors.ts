import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { storage } from "@/utils/storage";

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = storage.get<string | null>("auth_token", null);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn("[API] Unauthorized session. Token expired or invalid.");
      } else if (error.response && error.response.status >= 500) {
        console.error("[API] Enterprise Server Error:", error.message);
      }
      return Promise.reject(error);
    }
  );
};
