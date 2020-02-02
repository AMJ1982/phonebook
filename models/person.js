const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

// useFindAndModify-asetus falseksi, jotta findByIdAndUpdate()-metodi toimisi
mongoose.set('useFindAndModify', false)

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(success => 
    console.log('Connection established'))
  .catch(error => console.log('Error with connection', error))

schema = new mongoose.Schema({
  name: String, 
  number: String,
})

schema.set('toJSON', {
  transform: (document, receivedObject) => {
    receivedObject.id = receivedObject._id
    delete receivedObject._id
    delete receivedObject.__v
  }
})

module.exports = mongoose.model('Person', schema)