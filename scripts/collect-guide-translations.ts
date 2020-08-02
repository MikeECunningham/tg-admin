/**
 * Collects guide translatable strings 
*/

import pages from "../src/components/guide/pages"
import * as fs from "fs";

let requiredTranslations = [];

for(var i of pages){
    requiredTranslations.push(i.speciesName);
    for(let j of i.descriptions){
        requiredTranslations.push(j);
    }
}

// Read the current english json to append the values to it
let englishJson = JSON.parse(fs.readFileSync('src/assets/i18n/en.json').toString());

// Append the newly required fields to the file
for(let i of requiredTranslations){
    englishJson[i] = "";
}

// Write the modified object back to the file
fs.writeFileSync('src/assets/i18n/en.json', JSON.stringify(englishJson));
