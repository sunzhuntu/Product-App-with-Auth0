const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

let products = [
    {id: 1, name:'UGG Womens Classic II Short Boot', category: 'Clothing', available: true},
    {id: 2, name:'Dell Inspiron i3531-1200BK 15.6-Inch Laptop', category: 'Electronics', available: false},
    {id: 3, name:'San Francisco Bay Coffee Breakfast Blend', category: 'Food', available: true}
]

app.get('/', (request, response) => {
    response.send('<h1> this is a web server </h1>')
})
  
app.get('/api/products', (request, response) => {
    response.json(products)
    console.log('handle http get request')
})

app.get('/api/products/:id', (request, response) => {
    const id = Number(request.params.id)
    const product = products.find(product => product.id === id)
    if (product){
        response.json(product)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/products/:id', (request, response) => {
    const id = Number(request.params.id)
    products = products.filter(product => product.id !== id)
    response.status(204).end()
})


const generateId = () => {
    const maxId = products.length > 0
    ? Math.max(...products.map(p => p.id)) 
    : 0
    return maxId + 1
}

app.post('/api/products', (request, response) => {
    const body = request.body
    console.log('handle http post request')

    if (!body.name || !body.category) {
        return response.status(400).json({ 
            error: 'name or category missing' 
        })
    }

    const product = {
        id: generateId(),
        name: body.name,
        category: body.category
    }

    products = products.concat(product)
    response.json(product)
})

app.put('/api/products/:id', (request, response) => {
    const body = request.body
    console.log('handle http post request')

    const id = Number(request.params.id)
    //products = products.filter(product => product.id !== id)
    //response.status(204).end()
})

const PORT = 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})