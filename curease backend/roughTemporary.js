import { readFile, writeFile } from "fs";
import { join } from "path";

const inputFile =  "cities_r2.csv";     
const outputFile =  "cityList.csv";

// Read the input file
readFile(inputFile, "utf8", (err, data) => {
  if (err) return console.error("Error reading file:", err);

  const lines = data.trim().split("\n");
  const result = lines.map(line => {
    // Split CSV row safely (basic version)
    const [firstCol] = line.split(",");
    return firstCol;
  });

  writeFile(outputFile, result.join("\n"), "utf8", err => {
    if (err) return console.error("Error writing file:", err);
    console.log("✅ Successfully extracted first column to", outputFile);
  });
});