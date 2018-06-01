// Imports
const FS = require('fs');
const IMDB = require('imdb-api');
const PapaParse = require('papaparse');

// Parameters
const apiKey = 'a1cce831';
const fileName = 'movies.csv'

// --------------------------------------------------------
// Read in CSV into a string
let csvString = FS.readFileSync(fileName, 'utf-8');   // utf-8 seems to be necessary here

// Use papaparse to convert string into object
let csv = PapaParse.parse(csvString, {
    header: true,
});

// Reduce
csv = csv['data']
const titles = csv.map(object => object['title'])

// Set up async/await API caller function
async function callAPI(titles) {
    try {
        let promises = titles.map(title => IMDB.get(title, {apiKey: apiKey}));
        const results = await Promise.all(promises);
		FS.writeFileSync('imdb_data.json', JSON.stringify(results));
    } catch(error) {
        console.log(error);
    }
}
callAPI(titles)