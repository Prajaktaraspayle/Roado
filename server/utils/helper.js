const axios = require('axios')
require('dotenv').config()

//app key and app id provided by oxford
const app_id = process.env.oxfordAppId
const app_key = process.env.oxfordAppKey
const fields = "pronunciations,definitions,etymologies,examples"
const strictMatch = "false";
const wordId = "ace"
//oxford API base url
oxfordBaseUrl = 'https://od-api.oxforddictionaries.com/api/v2/'

//function to get details of words
const getWordDetail = async () => {
    const options = {
        host: 'od-api.oxforddictionaries.com',
        port : 443,
        path: `/api/v2/entries/en-gb/${wordId}?fields=${fields}&strictMatch=${strictMatch}`,
        method: 'GET',
        headers: {
            'app_id': app_id,
            'app_key': app_key
        }
    }

    http.get(options, (res) => {
        let body = ''
        res.on('data', (chunk) => {
            body += chunk
        })
        res.on('end', () => {
            let parsed = JSON.stringify(body)
            console.log(parsed)
        })
    })

    //definig an empty object
    let wordObj = {}

    //error handling
    try {
        let { data } = await axios(options)

        //add required fields to word object
        wordObj.word = data.word
        wordObj.entries = []
        data.results[0].lexicalEntries.forEach(entry => {
            wordObj.entries.push({
                partOfSpeech: entry.lexicalCategory.text,
                origin: entry.entries[0].etymologies,
                definitions: entry.entries[0].senses[0].definitions,
                examples: entry.entries[0].senses[0].examples.map(example => example.text)
            })
        })

        //return word object
        return wordObj
    } catch (e) {
        return false
    }
}

module.exports = getWordDetail