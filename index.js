const express = require('express')
const fruits = require('./fruits')

const PORT = process.env.PORT || 3001

const app = express()

app.get('/ping', (req, res) => {
  res.json('pong')
})

app.get('/greet/:name', (req, res) => {
  res.json(`Why hello there, ${req.params.name}!`)
})

app.get('/five', (request, response) => {
  const array = [1, 2, 3, 4, 5]
  response.send(array)
})

app.get('/evens/:n', (request, response) => {
  const arr = []
  const limit = parseInt(request.params.n)
  for (let i = 2; i <= limit; i++) {
    if (i % 2 === 0) {
      arr.push(i)
    }
  }
  response.send(arr)
})

app.get('/namelength/:name', (req, res) => {
  const name = req.params.name
  res.json(name.length)
})

app.get('/fruits', (req, res) => {
  res.send(fruits)
})

app.get('/fruits/sort', (req, res) => {
  fruits.sort(function (fruitA, fruitB) {
    const fruitAName = fruitA.name.toUpperCase()
    const fruitBName = fruitB.name.toUpperCase()
    if (fruitAName < fruitBName) {
      return -1
    }
    if (fruitAName > fruitBName) {
      return 1
    }
    return 0
  })
  res.send(fruits)
})

app.get('/fruits/:name', (req, res) => {
  const name = req.params.name.toLowerCase()
  const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name)
  res.send(fruit)
})

app.get('*', (req, res) => {
  res.send('404 Not Found')
})

app.listen(PORT, () =>
  console.log(`Serving up delicious fruits on port ${PORT} 🍒`)
)
