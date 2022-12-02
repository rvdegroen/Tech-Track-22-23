import axios from "axios";

// axios is a replacement for fetch
// more useful with API's that require authentication for ex.: cookies/ access tokens src: https://axios-http.com/docs/instance
export const axiosInstance = axios.create({
  baseURL: "https://acnhapi.com/v1a",
});

export const fetchVillagers = async () => {
  // old fetch function

  // fetch villagers
  // const response = await fetch("https://acnhapi.com/v1a/villagers/");
  // save response as json in variable
  // const data = await response.json();
  // return data;

  // new fetch function with axios so you don't have to write the whole URL
  // src: https://stackoverflow.com/questions/48980380/returning-data-from-axios-api
  const response = await axiosInstance.get("/villagers");
  return response.data;
};
