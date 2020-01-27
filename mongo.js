const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('Insufficient parameters')
  process.exit(1)
} 

const pwd = process.argv[2]
const url = `mongodb+srv://KasimirS:${pwd}@cluster0-pebro.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const schema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = new mongoose.model('Person', schema)

if(process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(r => console.log(r))
    // Yhteyden sulku oltava callbackin sisällä. Jos laitettaisiin pykälää ulompaan lohkoon, koodi etenisi siihen ennen aikojaan 
    // forEachin jäädessä suorittamaan tehtäväänsä.
    mongoose.connection.close()
  })  
} else if(process.argv.length === 5) {
  const newName = process.argv[3]
  const newNumber = process.argv[4]
  const person = new Person({
    name: newName, 
    number: newNumber,
  })
  person.save().then(result => {
    console.log(`Added ${newName} number ${newNumber}`)
    mongoose.connection.close()
  })
} else {
  console.log('Insufficient parameters')
  mongoose.connection.close()
}
