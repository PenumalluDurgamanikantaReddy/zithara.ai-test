import axiosInstance from "./interceptor";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, body }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data: data,
        params,
        headers,
        body,
      });

      return Promise.resolve(result)
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response.status || 500,
          data: axiosError.response.data || axiosError.message,
        },
      };
    }
  };


  export default axiosBaseQuery