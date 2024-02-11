const axiosClient = jest.genMockFromModule('axios')
axiosClient.create = jest.fn(() => axiosClient);
axiosClient.interceptors.request.use = jest.fn();
axiosClient.interceptors.response.use = jest.fn();
export default axiosClient;