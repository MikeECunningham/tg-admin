import * as fs from "fs";

process.env.GOOGLE_APPLICATION_CREDENTIALS='google-key.json';

if(!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("GOOGLE_APPLICATION_CREDENTIALS not set, please set before continuing");
    process.exit(-1);
}

const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

async function translateFrench(){
    let rawdata = fs.readFileSync('src/assets/i18n/fr.json');
    let en = JSON.parse(rawdata.toString());
    for(let i of Object.keys(en)) {
        en[i]=await translateText(i,'fr');
    };

    fs.writeFileSync('src/assets/i18n/fr.json', JSON.stringify(en))
}

/**
 * Calls the google api and translates the text to the target language
 */

async function translateText(input, language) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(input, language);
  return translations;
}

translateFrench();