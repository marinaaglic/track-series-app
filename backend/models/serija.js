const mongoose = require('mongoose')
 
const serijaSchema = new mongoose.Schema({
  naziv: {
      type: String,
      required: true
  },
  pogledano: {
      type: Boolean,
      default: false
  },
  broj_sezona: {
    type: Number,
    required: true
  },
  broj_epizoda: {
    type: Number,
    required: true
  }
})

serijaSchema.set('toJSON', {
  transform: (doc, ret) => {
      ret.id = doc._id.toString()
      delete ret._id
      delete ret.__v
      return ret
  }
})
 
module.exports = mongoose.model('Serija', serijaSchema, 'serije');
