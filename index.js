const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checkMiddleware = (req, res, next) => {
  if (!!!req.body.age) {
    return res.render('new', { emptyAge: true })
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('new')
})

app.post('/check', checkMiddleware, (req, res) => {
  let age = req.body.age
  if (age >= 18) {
    return res.render('major', { age })
  } else {
    return res.render('minor', { age })
  }
})

app.listen(3000)
