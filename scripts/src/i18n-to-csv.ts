/**
 * This script populates the json files for internationalization with the values of their keys
**/

const fs = require('fs');
const replaceQuotes = (col) => col.replace(/\"/g, '""')

const jsonDir = 'src/assets/i18n/';

// Gets a list of the json files in the directory
const files = fs.readdirSync(jsonDir);

for(let i of files){
    let targetLanguage = i.substring(i.lastIndexOf('/')+1, i.lastIndexOf('.'));
    if(targetLanguage=='en') continue;
    let fileData = fs.readFileSync(jsonDir+i);
    let stringData = fileData.toString();
    let translationObject = JSON.parse(stringData);
    let csvString = `"en", "${targetLanguage}"\n`;
    for(let i of Object.keys(translationObject)){
        csvString+=`"${replaceQuotes(i)}", "${replaceQuotes(translationObject[i])}"\n`;
    }
    // Trim the last newline
    csvString.substr(0, csvString.length-1);
    // Write this translation file
    fs.writeFileSync(`src/assets/translations/${targetLanguage}.csv`, csvString);

}