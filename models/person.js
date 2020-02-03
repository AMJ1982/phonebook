const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
// Validaattori unique-arvoja varten
const uniqueValidator = require('mongoose-unique-validator')

// useFindAndModify-asetus falseksi, jotta findByIdAndUpdate()-metodi toimisi
mongoose.set('useFindAndModify', false)

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(success => 
    console.log('Connection established'))
  .catch(error => console.log('Error with connection', error))

schema = new mongoose.Schema({
  name: {type: String, minlength: 3, unique: true},  
  number: {type: String, minlength: 8}
})

schema.plugin(uniqueValidator)

schema.set('toJSON', {
  transform: (document, receivedObject) => {
    receivedObject.id = receivedObject._id
    delete receivedObject._id
    delete receivedObject.__v
  }
})

module.exports = mongoose.model('Person', schema)