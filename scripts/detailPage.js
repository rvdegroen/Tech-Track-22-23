// Importing
// Our bundler automatically creates styling when imported in the main JS file!
import "../styles/style.css";
// We can use node_modules directely in the browser!
import * as d3 from "d3";

import { fetchVillagers } from "./api";

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
  // fetch all villagers
  const villagers = await fetchVillagers();
  // fetch villager with id
  const villager = await fetchVillager(villagerId);
  // create or get html elements
  const $h2 = document.getElementById("h2Villager");
  const $divSelectedVillager = document.getElementById("selectedVillager");
  const $detailsGender = document.getElementById("detailsGender");
  const $detailsPersonality = document.getElementById("detailsPersonality");
  const $detailsSpecies = document.getElementById("detailsSpecies");
  const $divSimilarVillagers = document.getElementById("similarVillagers");
  const image = document.createElement("img");
  const h3 = document.createElement("h3");

  // getting data
  image.src = villager.icon_uri;

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

  // show similar villagers
  const similarVillagers = villagers.filter(
    (potentiallySimilarVillager) =>
      potentiallySimilarVillager.gender === villager.gender &&
      potentiallySimilarVillager.species === villager.species &&
      potentiallySimilarVillager.personality === villager.personality &&
      potentiallySimilarVillager.id !== villager.id
  );

  for (const similarVillager of similarVillagers) {
    const anchor = document.createElement("a");
    const image = document.createElement("img");
    const p = document.createElement("p");
    image.src = similarVillager.icon_uri;
    anchor.href = `/villager.html?id=${similarVillager.id}`;
    p.textContent = similarVillager.name["name-EUen"];
    anchor.appendChild(image);
    anchor.appendChild(p);
    $divSimilarVillagers.appendChild(anchor);
  }

  // to be able to use the - in the name, I need to use [] instead of .
  $h2.textContent = `${similarVillagers.length} Similar Villager${
    similarVillagers.length > 0 ? "s" : ""
  } like ${villager.name["name-EUen"]}`;
};

// calling functions
showData();
