require('dotenv').config()
 
const PORT = process.env.PORT
 
// Baza podataka
const password = process.env.ATLAS_PASS	
const dbname = process.env.NODE_ENV === 'test'
? 'serije-api-test'
: 'serije-api'
const url = `mongodb+srv://oarwa-mac:${password}@cluster0.20w7z.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = {PORT, url}