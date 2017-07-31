const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const expressSession = require('express-session')

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)

// const todos = {
//   listName: 'TODO List',
//   list: [
//     { item: 'Complete TODO List Project' },
//     { item: 'Complete Password Project' },
//     { item: 'Complete Weekly Project' },
//     { item: 'Cook Dinner' }
//   ],
//   complete: []
// }

app.get('/', (request, response) => {
  const todoList = request.session.todoList || []

  const todos = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }
  response.render('index', todos)
})

app.post('/addTodo', (request, response) => {
  const todoList = request.session.todoList || []
  const description = request.body.description
  // request.checkBody('item', 'No Items Added')
  // const errors = request.validationErrors()
  //
  // // if (errors) {
  // //   // What to do here?
  // // } else {
  // todos.list.push({ item: request.body.item })
  todoList.push({ id: todoList.length + 1, completed: false, description: description })
  request.session.todoList = todoList
  response.redirect('/')
})
// })

app.post('/complete', (request, response) => {
  const todoList = request.session.todoList || []
  // How can we find the item and move it from `list` to complete
  // todos.complete.push({ item: request.params.item })
  // todos.list = todos.list.filter(todo => todo.item !== request.params.item)
  const id = parseInt(request.body.id)
  const todo = todoList.find(todo => todo.id === id)

  if (todo) {
    todo.completed = true
    request.session.todoList
  }

  response.redirect('/')
})

app.listen(3000, () => {
  console.log('Things are Happening')
})
