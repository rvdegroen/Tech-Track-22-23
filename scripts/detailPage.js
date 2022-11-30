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
  // fetch villager with id
  const villager = await fetchVillager(villagerId);
  // create or get html elements
  const $h2 = document.getElementById("h2Villager");
  const $divSelectedVillager = document.getElementById("selectedVillager");
  const $detailsGender = document.getElementById("detailsGender");
  const $detailsPersonality = document.getElementById("detailsPersonality");
  const $detailsSpecies = document.getElementById("detailsSpecies");
  //const $divSimilarVillagers = getElementById("similarVillagers");
  const image = document.createElement("img");
  const h3 = document.createElement("h3");

  // getting data
  image.src = villager.icon_uri;
  // to be able to use the - in the name, I need to use [] instead of .
  $h2.textContent = `${1} Similar Villager like ${villager.name["name-EUen"]}`;
  // div of selected villager
  h3.textContent = villager.name["name-EUen"];
  $divSelectedVillager.appendChild(image);
  $divSelectedVillager.appendChild(h3);

  // function for female/ male colors
  if (villager.gender === "Female") {
    h3.classList.add("femaleVillager");
    $detailsGender.classList.add("femaleText");
  } else {
    h3.classList.add("maleVillager");
    $detailsGender.classList.add("maleText");
  }

  // For details color personalities
  $detailsPersonality.classList.add(`${villager.personality.toLowerCase()}`);

  // details shown in table on bottom of page
  $detailsGender.textContent = villager.gender;
  $detailsPersonality.textContent = villager.personality;
  $detailsSpecies.textContent = villager.species;

  // generating table with gender, personality and species
};

// calling functions
showData();
