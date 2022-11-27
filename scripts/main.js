// Importing
// Our bundler automatically creates styling when imported in the main JS file!
import "../styles/style.css";
// We can use node_modules directely in the browser!
import * as d3 from "d3";

// Importing functions
import { testFunction } from "./filter";

// Data of villagers
/*const villagers = async () => {
  const response = await fetch("https://acnhapi.com/v1a/villagers/");
  const data = await response.json();
  console.log(data);
};*/

//// Functions -  $ stands for html elements

// Dropdown filter
const $gender = document.getElementById("gender");
const $personality = document.getElementById("personality");
const $species = document.getElementById("species");
const $villagers = document.getElementById("villagers");

// function to put available genders in the dropdown menu as $option element
const initializeGenders = async () => {
  // fetch villagers
  const response = await fetch("https://acnhapi.com/v1/villagers");
  // save response as json in variable
  const villagersObject = await response.json();
  const villagers = Object.values(villagersObject);

  // use ... to convert array into a set of arguments of a function
  // filter is to take something out of the object
  // reduce maps and filters in a single pass
  const allGender = villagers.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.gender],
    []
  );
  // I don't want duplicate values from allSpecies and turn it into an array, so I use Set: https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/
  const uniqueGender = Array.from(new Set(allGender));
  // Make for every value in the array: uniqueSpecies an option for dropdown filter
  for (const gender of uniqueGender) {
    const option = document.createElement("option");
    option.value = gender;
    option.textContent = gender;
    $gender.appendChild(option);
  }
};

// function to put available personalities in the dropdown menu as $option element
const initializePersonalities = async () => {
  // fetch villagers
  const response = await fetch("https://acnhapi.com/v1/villagers");
  // save response as json in variable
  const villagersObject = await response.json();
  const villagers = Object.values(villagersObject);

  // use ... to convert array into a set of arguments of a function
  // filter is to take something out of the object
  // reduce maps and filters in a single pass
  const allPersonalities = villagers.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.personality],
    []
  );
  // I don't want duplicate values from allSpecies and turn it into an array, so I use Set: https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/
  const uniquePersonality = Array.from(new Set(allPersonalities));
  // Make for every value in the array: uniqueSpecies an option for dropdown filter
  for (const personality of uniquePersonality) {
    const option = document.createElement("option");
    option.value = personality;
    option.textContent = personality;
    $personality.appendChild(option);
  }
};

// function to put available species in the dropdown menu as $option element
const initializeSpecies = async () => {
  // fetch villagers
  const response = await fetch("https://acnhapi.com/v1/villagers");
  // save response as json in variable
  const villagersObject = await response.json();
  const villagers = Object.values(villagersObject);

  // use ... to convert array into a set of arguments of a function
  // filter is to take something out of the object
  // reduce maps and filters in a single pass
  const allSpecies = villagers.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.species],
    []
  );

  // I don't want duplicate values from allSpecies and turn it into an array, so I use Set: https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/
  const uniqueSpecies = Array.from(new Set(allSpecies));
  // Make for every value in the array: uniqueSpecies an option for dropdown filter
  for (const species of uniqueSpecies) {
    const option = document.createElement("option");
    option.value = species;
    option.textContent = species;
    $species.appendChild(option);
  }
};

// function to create the html elements of a villager icon
const createVillagerIcon = (villager) => {
  const image = document.createElement("img");
  image.src = villager.icon_uri;
  $villagers.appendChild(image);
};

// function for when you first load the page and get to see all villagers unfiltered
const initializeVillagers = async () => {
  const response = await fetch("https://acnhapi.com/v1/villagers");
  const villagersObj = await response.json();
  const villagers = Object.values(villagersObj);

  for (const villager of villagers) {
    createVillagerIcon(villager);
  }
};

// function for when you use the gender filter on the overview page
const filterGender = async (event) => {
  $villagers.innerHTML = "";
  const response = await fetch("https://acnhapi.com/v1/villagers");
  const villagersObj = await response.json();
  const villagers = Object.values(villagersObj);
  const filteredGender = villagers.filter((villager) => villager.gender === $gender.value);

  for (const villager of filteredGender) {
    createVillagerIcon(villager);
  }
};

// function for when you use the personality filter on the overview page
const filterPersonality = async (event) => {
  $villagers.innerHTML = "";
  const response = await fetch("https://acnhapi.com/v1/villagers");
  const villagersObj = await response.json();
  const villagers = Object.values(villagersObj);
  const filteredPersonality = villagers.filter(
    (villager) => villager.personality === $personality.value
  );

  for (const villager of filteredPersonality) {
    createVillagerIcon(villager);
  }
};

// function for when you use the species filter on the overview page
const filterSpecies = async (event) => {
  $villagers.innerHTML = "";
  const response = await fetch("https://acnhapi.com/v1/villagers");
  const villagersObj = await response.json();
  const villagers = Object.values(villagersObj);
  const filteredVillagers = villagers.filter((villager) => villager.species === $species.value);

  for (const villager of filteredVillagers) {
    createVillagerIcon(villager);
  }
};

////// calling functions
initializeVillagers();
initializeGenders();
initializePersonalities();
initializeSpecies();

//// event listeners
// dropdown filters on overview page
$gender.addEventListener("change", (event) => filterGender(event));
$personality.addEventListener("change", (event) => filterPersonality(event));
$species.addEventListener("change", (event) => filterSpecies(event));
