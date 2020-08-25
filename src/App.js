import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import productService from './services/products'


const Button = ({eventHandler, text}) => {
  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: 4,
    margin: 4,
    fontSize: 16,
    cursor: 'pointer',
    fontStyle: 'italic',
    borderRadius: 12
  }
  return <button style={buttonStyle} onClick={eventHandler}> {text} </button>
}


const Display = ({product, changeAvailable}) => {
  const text = product.available
    ? 'sold out'
    : 'available'
  return(
    <li className='product'> 
      {product.id} - {product.name} - {product.category}
      <Button eventHandler={changeAvailable}  text={text}/>
    </li>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
 
const App = () => {
  const [products, setProducts] = useState([])
  const [newProductName, setNewProductName] = useState ('a new product name')
  const [newProductCategory, setNewProductCategory] = useState ('a new product category')
  const [showAllProducts, setShowAllProducts] = useState(true)
  const [errorMessage, setErrorMessage] = useState('no error happened...')

  //load all existing products from the server
  const hook = () => {
    console.log('effect')
    productService
      .getAll()
      .then (initialNotes => {
        console.log('promoise fulfilled')
        setProducts(initialNotes)
      })
  }
  useEffect(hook, [])

  //add new product
  const addProduct = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const productObject = {
      name: newProductName,
      category: newProductCategory,
      available: Math.random() > 0.5
    }

    productService
      .createNote(productObject)
      .then(returnedProduct => {
        console.log(returnedProduct)
        setProducts(products.concat(returnedProduct))
        setNewProductName('a new product name')
        setNewProductCategory('a new product category')
    })
  }

  const handleProductNameChange = (event) => {
    console.log(event.target.value)
    setNewProductName(event.target.value)
  }

  const handleProductCategoryChange = (event) => {
    console.log(event.target.value)
    setNewProductCategory(event.target.value)
  }

  //change the availability of the product
  const changeAvailableOf = (id) => {
    console.log('the availability of ', id, 'needs to be changed')
    const product = products.find(p => p.id === id)
    const changedProduct = {...product, available: !product.available}
    productService
      .updateNote(id, changedProduct)
      .then(returnedProduct => {
        setProducts(products.map(product => 
          product.id !== id
            ? product
            : returnedProduct
        ))
      })
      .catch(error => {
        setErrorMessage('the product was already deleted from server')
        setTimeout(() => {
          setErrorMessage('no errors happened')
        }, 5000)
        setProducts(products.filter(p => p.id !== id))
      })
  }

  //show products with constraint
  const productsToShow = showAllProducts
  ? products
  : products.filter(product => product.category === 'Electronics')
  
  const displayControl = () => {
      setShowAllProducts(!showAllProducts)
  }

  console.log('render', products.length, 'products')

  return (
    <div>
      <div> 
        <h3> Display existing products </h3>
        <Notification message={errorMessage}/>
        <Button eventHandler={displayControl} text={`Show ${showAllProducts? 'Electronics' : 'All'}` }/>
        <ul>
          {productsToShow.map(product => 
            <Display key={product.id} product={product} changeAvailable={() => changeAvailableOf(product.id)}/>
          )}
        </ul>
      </div>
      <div>
      <h3> Adding new products </h3>
      <form onSubmit={addProduct}>
        <input 
        value={newProductName}
        onChange={handleProductNameChange}
        />
        <input 
        value={newProductCategory}
        onChange={handleProductCategoryChange}
        />
        <button type="submit"> Save </button>
      </form>
      </div>
    </div>
  );
}

export default App;
