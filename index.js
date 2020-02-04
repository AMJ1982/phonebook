require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// T3.9: Asennettu projektikansiossa middleware Cors (npm install cors --save), ja otettu se käyttöön tässä koodissa.

// Morganin tokenit ovat kutsuttavia, määrätyn tiedon tulostavia avainsanoja. Jos morgan määritellään toimimaan 
// minimaalisilla tulostuksilla määrittelemällä se sovellusolioon app.use(morgan('tiny')), pyyntöjen yhteydessä 
// tulostuu komentokehotteeseen automaattisesti tiedot tokeneilla :method, :url, :status, :res[content-length] - 
// :response-time ms. Uusi token luodaan metodilla morgan.token(), ja parametreiksi annetaan tokenin nimi, sekä 
// callback-funktio, jota kutsutaan kun tokenia käytetään. Luodaan token 'test', joka tulostaa POST-pyynnön 
// mukana tulevan olion. app.use()-metodissa määritellään manuaalisesti käytettävät tokenit, joista viimeisenä 
// itse luotu :test.
morgan.token('test', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :test'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Ana",
      "number": "1234321",
      "id": 5
    }
]
// Apufunktiot
// Generoi tietueelle yksilöllisen id:n. Ei käytössä tällä hetkellä, koska id muodostetaan tietokannassa.
const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

const findDuplicates = (name) => {
  const foundPerson = persons.some(p => p.name === name)
  return foundPerson
}

// Kaikki tiedot
app.get('/app/persons/', (req, res) => {
  //res.json(persons)
  Person.find({}).then(result => {
    res.json(result.map(person => person.toJSON()))
  })
})
// Palvelimen info
app.get('/info', (req, res) => {
  Person.collection.countDocuments({})
  .then(contactAmount => 
    res.send(`<p>Phonebook has info for ${contactAmount} people</p>
              <p>${new Date()}`))
  .catch(error => next(error))  
})
// Yksittäinen tieto
app.get('/app/persons/:id', (req, res, next) => {  
  Person.findById(req.params.id).then(returnedPerson => 
    res.json(returnedPerson.toJSON()))
    .catch(error => next(error))
})
// Tiedon poistaminen
app.delete('/app/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(response => res.status(204).end())
    .catch(error => next(error))
})

// Uusi tieto
app.post('/app/persons', (req, res, next) => {
  const newPerson = req.body
  const person = new Person({
    name: newPerson.name, 
    number: newPerson.number
  })

  person.save()
    .then(addedPerson => res.json(addedPerson.toJSON()))
    .catch(error => next(error))
})

// Numeron päivittäminen
app.put('/app/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name, 
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    .catch(error => next(error))
})  

// Virheenkäsittelijä
const errorHandler = (error, req, res, next) => {
  console.log('Error.message virheenkäsittelijästä', error.message)
  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({error: 'malformed id'})
  } else if(error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on ${PORT}`))