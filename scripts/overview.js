// overview page

// Importing
// Our bundler automatically creates styling when imported in the main JS file!
import "../styles/style.css";

// Data of villagers
const fetchVillagers = async () => {
  // fetch villagers
  const response = await fetch("https://acnhapi.com/v1a/villagers/");
  // save response as json in variable
  const data = await response.json();
  return data;
};

// dropdown filter variables
const $gender = document.getElementById("gender");
const $personality = document.getElementById("personality");
const $species = document.getElementById("species");
const $villagers = document.getElementById("villagers");

//// Functions -  $ stands for html elements

// function to put available genders, species and personalities in the dropdown menu as $option element
const filterOptions = async () => {
  // fetch villagers function
  const villagers = await fetchVillagers();

  // use ... to convert array into a set of arguments of a function
  // filter is to take something out of the object
  // reduce maps and filters in a single pass
  const allGender = villagers.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.gender],
    []
  );
  const allPersonalities = villagers.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.personality],
    []
  );
  const allSpecies = villagers.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue.species],
    []
  );

  // I don't want duplicate values from allSpecies and turn it into an array, so I use Set: https://www.samanthaming.com/tidbits/43-3-ways-to-remove-array-duplicates/
  // Initializing genders
  const uniqueGender = Array.from(new Set(allGender));
  // Make for every value in the array: uniqueSpecies an option for dropdown filter
  for (const gender of uniqueGender) {
    const option = document.createElement("option");
    option.value = gender;
    option.textContent = gender;
    $gender.appendChild(option);
  }

  // Initializing personalities
  const uniquePersonality = Array.from(new Set(allPersonalities));
  // Make for every value in the array: uniqueSpecies an option for dropdown filter
  for (const personality of uniquePersonality) {
    const option = document.createElement("option");
    option.value = personality;
    option.textContent = personality;
    $personality.appendChild(option);

    // Initializing species
    const uniqueSpecies = Array.from(new Set(allSpecies));
    // Make for every value in the array: uniqueSpecies an option for dropdown filter
    for (const species of uniqueSpecies) {
      const option = document.createElement("option");
      option.value = species;
      option.textContent = species;
      $species.appendChild(option);
    }
  }
};

// function for when you first load the page and get to see all villagers unfiltered
const initializeVillagers = async () => {
  // fetch villagers function
  const villagers = await fetchVillagers();

  for (const villager of villagers) {
    createVillagerIcon(villager);
  }
};

// function to create the html elements of a villager icon
const createVillagerIcon = (villager) => {
  const anchor = document.createElement("a");
  const image = document.createElement("img");
  const p = document.createElement("p");
  image.src = villager.icon_uri;
  anchor.href = `/villager.html?id=${villager.id}`;
  p.textContent = villager.name["name-EUen"];
  anchor.appendChild(image);
  anchor.appendChild(p);
  $villagers.appendChild(anchor);
};

// function for when you use the filter on the overview page
const filterVillager = async (event) => {
  $villagers.innerHTML = "";

  // fetch villagers function
  let villagers = await fetchVillagers();

  // filter function for gender: only the villagers with the same gender value stays
  if ($gender.value !== "none") {
    villagers = villagers.filter((villager) => villager.gender === $gender.value);
  }

  // filter function for personality: only the villagers with the same personality value stays
  if ($personality.value !== "none") {
    villagers = villagers.filter((villager) => villager.personality === $personality.value);
  }

  // filter function for species: only the villagers with the same species value stays
  if ($species.value !== "none") {
    villagers = villagers.filter((villager) => villager.species === $species.value);
  }

  // for every filtered villager, create villager icon
  for (const villager of villagers) {
    createVillagerIcon(villager);
  }
};

////// calling functions
filterOptions();
initializeVillagers();

//// event listeners of the dropdowns src: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
$gender.addEventListener("change", (event) => filterVillager(event));
$personality.addEventListener("change", (event) => filterVillager(event));
$species.addEventListener("change", (event) => filterVillager(event));
