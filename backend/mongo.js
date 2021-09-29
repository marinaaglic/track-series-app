const mongoose = require('mongoose') 
const password = 'magliccuv1234'
const dbname = 'serije-api'

const url = `mongodb+srv://oarwa-mac:${password}@cluster0.20w7z.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

const serijaSchema = new mongoose.Schema({
    naziv: String,
    pogledano: Boolean
  })
   
const Serija = mongoose.model('Serija', serijaSchema, 'serije')