const IMDB = require('imdb-api');
const apiKey = 'a1cce831';
const FS = require('fs');

// Set up async/await API caller function
const titles = ['Reservoir Dogs', 'They Live', 'Scarface', 'ABC123']
async function callAPI(titles) {
    let results = [];
    for (var i in titles) {
        title = titles[i];
        try {
            let result = await IMDB.get(title, {apiKey: apiKey});
            print(title)
            results.push(result);
        } catch(error) {
            console.log(error);
        }
    }
    FS.writeFileSync('imdb_data.json', JSON.stringify(results));
}
callAPI(titles);