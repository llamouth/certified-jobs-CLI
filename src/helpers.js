import { readFileSync, writeFileSync} from "node:fs"

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(0); // Exit the process after handling the exception
});

function readJsonFile(path, fileName) {
  const collection = readFileSync(`${path}/${fileName}`, "utf8");
  return collection ? JSON.parse(collection) : [];
}

function writeJsonFile(path, fileName, data) {
  data = JSON.stringify(data, 0, 2);
  return writeFileSync(`${path}/${fileName}`, data, { encoding: "utf-8" });
}

// Function to format number as USD currency
function formatToUSD(number) {
  // Create a NumberFormat object for USD
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Format the number as USD currency
  return formatter.format(number);
}

function formatToProperString (str) {
  let properString = str.split(" ")
  if(properString.length > 1) {
    properString = properString.map(word => `${word[0]}${word.slice(1)}`).join(" ")
  }else {
    properString = `${properString[0][0].toUpperCase()}${properString[0].slice(1)}`
  }
  return properString
}

function checkIfValidString(arr) {
  for(const str of arr){
    if (typeof str !== 'string' || str.length === 0) {
      throw "Please input a valid string";
    }
  }
}


export {
  readJsonFile,
  writeJsonFile,
  formatToUSD,
  formatToProperString,
  checkIfValidString
}