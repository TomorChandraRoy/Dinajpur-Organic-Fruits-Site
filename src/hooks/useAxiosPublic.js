import axios from "axios";

const axiosPublic = axios.create({
  //production aer dile .env file thake import kore dibo  import.meta.env.VITE_API_URL
  baseURL: "http://localhost:7000/api",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;