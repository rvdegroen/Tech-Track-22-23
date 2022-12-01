import axios from "axios";

// axios is a replacement for fetch
// more useful with API's that require authentication for ex.: cookies/ access tokens
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
  const response = await axiosInstance.get("/villagers");
  return response.data;
  // to console.log the villagers, use call the function with await, otherwise it returns a promise
};
