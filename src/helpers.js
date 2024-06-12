import { readFileSync, writeFileSync} from "node:fs"

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

export {
  readJsonFile,
  writeJsonFile,
  formatToUSD
}