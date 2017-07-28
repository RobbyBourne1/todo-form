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
  const errors = request.validationErrors()

  // if (errors) {
  //   // What to do here?
  // } else {
  todos.list.push({ item: request.body.item })

  response.redirect('/')
})
// })

app.post('/complete/:item', (request, response) => {
  // How can we find the item and move it from `list` to complete
  todos.complete.push({ item: request.params.item })
  todos.list = todos.list.filter(todo => todo.item !== request.params.item)

  response.redirect('/')
})

app.listen(3000, () => {
  console.log('Things are Happening')
})
