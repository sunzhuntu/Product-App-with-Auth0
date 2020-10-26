const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Product = require('../models/product')

usersRouter.post('/', async (request, response) => {
    const body = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.json(savedUser)
})
usersRouter.post('/getProducts', async (request, response) => {
  const body = request.body

  const products = await Product.find({user:body.userid})

  response.json(products)
  
})
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('products', {title: 1, category: 1})
    response.json(users)
})
  
module.exports = usersRouter
