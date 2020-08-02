"use strict";
/**
 * Collects guide translatable strings
*/
exports.__esModule = true;
var pages_1 = require("../src/components/guide/pages");
var fs = require("fs");
var requiredTranslations = [];
for (var _i = 0, pages_2 = pages_1["default"]; _i < pages_2.length; _i++) {
    var i = pages_2[_i];
    requiredTranslations.push(i.speciesName);
    for (var _a = 0, _b = i.descriptions; _a < _b.length; _a++) {
        var j = _b[_a];
        requiredTranslations.push(j);
    }
}
// Read the current english json to append the values to it
var englishJson = JSON.parse(fs.readFileSync('src/assets/i18n/en.json').toString());
// Append the newly required fields to the file
for (var _c = 0, requiredTranslations_1 = requiredTranslations; _c < requiredTranslations_1.length; _c++) {
    var i_1 = requiredTranslations_1[_c];
    englishJson[i_1] = "";
}
// Write the modified object back to the file
fs.writeFileSync('src/assets/i18n/en.json', JSON.stringify(englishJson));
