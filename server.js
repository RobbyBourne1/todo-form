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

app.use(expressValidator())

const todos = {
  listName: 'TODO List',
  list: [
    { item: 'Complete TODO List Project' },
    { item: 'Complete Password Project' },
    { item: 'Complete Weekly Project' },
    { item: 'Cook Dinner' }
  ],
  complete: []
}

app.get('/', (request, response) => {
  response.render('index', todos)
})

app.post('/', (request, response) => {
  request.checkBody('item', 'No Items Added')
  todos.list.push({ item: request.body.item })
  request.checkBody('submit', 'No Items Selected')
  todos.complete.push({ item: request.body.item })
  response.render('index', todos)
})

app.listen(3000, () => {
  console.log('Things are Happening')
})
