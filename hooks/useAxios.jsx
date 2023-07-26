import axios from "axios";

const useAxios = () => {
  const BASE_URL = "https://pbsolutions.dev/atina/";

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  return { axiosInstance };
};

export default useAxios;
