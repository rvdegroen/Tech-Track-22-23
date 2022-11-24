// Importing
// Our bundler automatically creates styling when imported in the main JS file!
import "../styles/style.css";

// We can use node_modules directely in the browser!
import * as d3 from "d3";

// Importing functions
import { testFunction } from "./filter";

// global
/**My data of villagers*/
const villagers = async () => {
  const response = await fetch("https://acnhapi.com/v1a/villagers/");
  const data = await response.json();
  console.log(data);
};

// Calling functions
testFunction();
villagers();
