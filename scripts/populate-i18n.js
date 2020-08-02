/**
 * This script populates the json files for internationalization with the values of their keys
**/

'use strict'
const fs = require('fs');


let rawdata = fs.readFileSync('src/assets/i18n/en.json');
let en = JSON.parse(rawdata.toString());
for(let i of Object.keys(en)) en[i]=i;
fs.writeFileSync('src/assets/i18n/en.json', JSON.stringify(en))