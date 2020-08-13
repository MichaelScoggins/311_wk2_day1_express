
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
let { users } = require('./state')
let counter = users.length+1
/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/1', (req, res) => {
  res.json(users[0])
})

app.get('/users/:userId', (req, res) => {
  // res.json(users[req.params.userId-1])
  const user = users.find(i => i._id == req.params.userId)
  console.log(user)
  res.json(user)

})
app.put('/users/:userId', (req, res) => {
    let user = (users.find(user => user._id === parseInt(req.params.userId)))
    user.name = req.body.name ? req.body.name : user.name
    user.avatar = req.body.avatar ? req.body.avatar : user.avatar
    user.occupation = req.body.occupation ? req.body.occupation : user.occupation
    res.json(user)
})

app.delete('/users/:userId', (req, res) => {  
  let user = (users.find(user => user._id === parseInt(req.params.userId)))
  user.isActive = false
  res.status(400).json({message:`No member with the id of ${req.params.userId}`})  
})

app.post('/users', (req, res) => {
  // const user5 = {_id: 5, name: "Freddy Krueger", occupation: "Dream Catcher", avatar: "https://www.screengeek.net/wp-content/uploads/2019/12/freddy-krueger.jpg"}
  users.push({_id: counter++, ...req.body})
  res.json(users[users.length-1])
})

app.put('/users/1', (req, res) => {
  users[0].occupation = "grocery bagger"
  res.json(users[0])
})


app.delete('/users/1', (req, res) => {
  users.shift()
  res.send("Deleted")
})

app.post('/users', (req, res) => {
  users.push(req.body)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`my app is listening on port ${port} @ ${new Date}!`))