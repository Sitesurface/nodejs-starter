const fs = require('fs');

// set the name of the input file (change this to match your filename)
const input_file = 'locales/en/translations.json';

// set the name of the output file (change this to match your desired output filename)
const output_file = 'src/constants/locale_constants.ts';

// start the output file with the class definition
fs.writeFileSync(output_file, 'class Locales {\n');

// read the input file contents
const input_data = fs.readFileSync(input_file, 'utf-8');

// parse the JSON data
const translations = JSON.parse(input_data);

// loop over each key-value pair in the translations object
for (const key in translations) {
  if (Object.hasOwnProperty.call(translations, key)) {
    // extract the value for the key
    const value = translations[key];

    // convert the key to the desired format (replace underscores with camelCase)
    const key_camel_case = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());

    // add the key as a static property to the Locales class, unless it is an empty line
    if (key !== '') {
      fs.appendFileSync(output_file, `  static ${key_camel_case} = '${key}';\n`);
    }
  }
}

// close the class definition
fs.appendFileSync(output_file, '}');
fs.appendFileSync(output_file, '\n\nexport default Locales;');
