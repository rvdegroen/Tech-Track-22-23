// Importing
// Our bundler automatically creates styling when imported in the main JS file!
import "../styles/style.css";
// We can use node_modules directely in the browser!
import * as d3 from "d3";

// how to get id from url: source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const urlParams = new URLSearchParams(window.location.search);
const villagerId = urlParams.get("id");

// Data of specific villagers
const fetchVillager = async (id) => {
  // fetch villagers
  const response = await fetch(`https://acnhapi.com/v1a/villagers/${id}`);
  // save response as json in variable
  const data = await response.json();
  return data;
};

//
const showData = async () => {
  const villager = await fetchVillager(villagerId);
  const h2 = document.getElementById("h2Villager");
  // to be able to use the - in the name, I need to use [] instead of .
  h2.textContent = `${1} Similar Villager like ${villager.name["name-EUen"]}`;

  villager.name;
  console.log(villager.name);
};

// calling functions
showData();
