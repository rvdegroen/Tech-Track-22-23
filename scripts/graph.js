// bar chart page

// Importing
// Our bundler automatically creates styling when imported in the main JS file!
import "../styles/style.css";
// We can use node_modules directely in the browser!
import * as d3 from "d3";

import { BarChart } from "./BarChart";

// Data of villagers
const fetchVillagers = async () => {
  // fetch villagers
  const response = await fetch("https://acnhapi.com/v1a/villagers/");
  // save response as json in variable
  const data = await response.json();
  return data;
  // to console.log the villagers, use call the function with await, otherwise it returns a promise
};

// when you click on the button, show the gender graphs
const showGender = async () => {
  const villagers = await fetchVillagers();
  const genderStatistics = villagers.reduce(
    (accumulator, currentValue) => {
      const newValueForAccumulator = [...accumulator];
      const index = currentValue.gender === "Male" ? 0 : 1;
      newValueForAccumulator[index].count = newValueForAccumulator[index].count + 1;
      return newValueForAccumulator;
    },
    [
      // objects for newValueForAccumulator with value of count
      { gender: "Male", count: 0 },
      { gender: "Female", count: 0 },
    ]
  );
  const myBarChart = BarChart(genderStatistics, {
    x: (data) => data.gender,
    y: (data) => data.count,
    color: "steelblue",
    width: 965,
    height: 526,
    // yFormat: "",
    yLabel: "↑ Total villagers",
  });

  d3.select("#barChart").node().innerHTML = "";
  d3.select("#barChart").node().appendChild(myBarChart);
};

// when you click on the button, show the personality graphs
const showPersonalities = async () => {
  const villagers = await fetchVillagers();
  const personalityStatistics = villagers.reduce((accumulator, currentValue) => {
    const newValueForAccumulator = [...accumulator];
    const { personality } = currentValue;
    const index = accumulator.findIndex((object) => object.personality === personality);
    if (index === -1) {
      // species statistic does not exist yet in accumulator
      newValueForAccumulator.push({ personality, count: 1 });
    } else {
      newValueForAccumulator[index].count = newValueForAccumulator[index].count + 1;
    }
    return newValueForAccumulator;
  }, []);

  const myBarChart = BarChart(personalityStatistics, {
    x: (data) => data.personality,
    y: (data) => data.count,
    color: "steelblue",
    width: 965,
    height: 526,
    // yFormat: "",
    yLabel: "↑ Total villagers",
  });
  d3.select("#barChart").node().innerHTML = "";
  d3.select("#barChart").node().appendChild(myBarChart);
};

// when you click on the button, show the species graphs
const showSpecies = async () => {
  const villagers = await fetchVillagers();
  const speciesStatistics = villagers.reduce((accumulator, currentValue) => {
    const newValueForAccumulator = [...accumulator];
    const { species } = currentValue;
    const index = accumulator.findIndex((object) => object.species === species);
    if (index === -1) {
      // species statistic does not exist yet in accumulator
      newValueForAccumulator.push({ species, count: 1 });
    } else {
      newValueForAccumulator[index].count = newValueForAccumulator[index].count + 1;
    }
    return newValueForAccumulator;
  }, []);

  const myBarChart = BarChart(speciesStatistics, {
    x: (data) => data.species,
    y: (data) => data.count,
    color: "steelblue",
    width: 1550,
    height: 526,
    // yFormat: "",
    yLabel: "↑ Total villagers",
  });
  d3.select("#barChart").node().innerHTML = "";
  d3.select("#barChart").node().appendChild(myBarChart);
};

// eventlisteners
const $genderButton = document.getElementById("genderButton");
const $personalitiesButton = document.getElementById("personalitiesButton");
const $speciesButton = document.getElementById("speciesButton");

$genderButton.addEventListener("click", (event) => showGender(event));
$personalitiesButton.addEventListener("click", (event) => showPersonalities(event));
$speciesButton.addEventListener("click", (event) => showSpecies(event));

/*
const myBarChart = BarChart(villagers, {
  x: (data) => data.letter,
  y: (data) => data.frequency,
  color: "steelblue",
  width: 965,
  height: 526,
  yFormat: "%",
  yLabel: "↑ Frequency",
});

d3.select("#barChart").node().appendChild(myBarChart);
*/
