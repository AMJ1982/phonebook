const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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
const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

const findDuplicates = (name) => {
  const foundPerson = persons.some(p => p.name === name)
  return foundPerson
}

// Kaikki tiedot
app.get('/app/persons/', (req, res) => {
  res.json(persons)
})
// Palvelimen info
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}`)
})
// Yksittäinen tieto
app.get('/app/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if(persons) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})
// Tiedon poistaminen
app.delete('/app/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})
// Uusi tieto
app.post('/app/persons', (req, res) => {
  const newPerson = req.body
  // Puuttuuko numero tai nimi  
  if(!newPerson.name || !newPerson.number) {
    return res.status(400).json({error: "Provide name and number"})
  }  
  // Löytyykö henkilö jo listalta
  if(findDuplicates(newPerson.name)) {
    return res.status(409).json({error: "Name must be unique"})
  }
  
  newPerson.id = generateId()
  persons = persons.concat(newPerson) 
  res.json(newPerson)  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))