const express = require('express')
const app = express()

const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.use(express.static('public'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

// app.use(expressValidator())

const todos = {
  listName: 'TODO List',
  list: [
    { item: 'Complete TODO List Project' },
    { item: 'Complete Password Project' },
    { item: 'Complete Weekly Project' },
    { item: 'Cook Dinner' }
  ]
}

app.get('/', (required, response) => {
  response.render('index', todos)
})

app.post('/' (required, response) => {
  
})

app.listen(3000, () => {
  console.log('Things are Happening')
})
