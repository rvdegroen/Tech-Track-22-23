export const fetchVillagers = async () => {
  // fetch villagers
  const response = await fetch("https://acnhapi.com/v1a/villagers/");
  // save response as json in variable
  const data = await response.json();
  return data;
  // to console.log the villagers, use call the function with await, otherwise it returns a promise
};
