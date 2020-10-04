import React, {useState, useEffect} from 'react';
import './App.css';
import productService from './services/products'
import Users from './components/Users'
import Home from './components/Home'
import Products from './components/Products'
import Product from './components/Product'
import Button from './components/Button'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";


const footerStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: 20,
  margin: 20,
  fontSize: 12
}

const padding = {
  padding: 20,
  margin: 20,
  color: 'black',
  fontSize: 20
}

const App = () => {
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(null)
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  //load all existing products from the server
  useEffect(() => {
    console.log('effect')
    productService
      .getAll()
      .then (initialProducts => {
        console.log('promoise fulfilled')
        setProducts(initialProducts)
      })
  }, [])

  //update products
  const updateProductHandler = (updatedProducts) => {
    setProducts(updatedProducts)
  }

  console.log('render', products.length, 'products')

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          {!isAuthenticated && (
            <Button text="log in" eventHandler={() => loginWithRedirect()}/>
          )}
          {isAuthenticated && (
          <span>  
              <Link style={padding} to="/products"> products </Link>
              <Link style={padding} to="/users"> users </Link>
              <Button text="log out" eventHandler={() => logout()}/>
          </span> 
          )}
        </div>
        
        <Switch>
            <Route path="/products/:id">
              <Product products={products} />
            </Route>
            <Route path="/products">
              <Products products={products} user={user} updateProductHandler={updateProductHandler} />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home user={user}/>
            </Route>
        </Switch>
      </Router>
      <footer style={footerStyle}>
        <i> Product App, Department of Computing </i>
        <br/><i> {Date()}</i>
      </footer>
    </div>
  )
}

export default App;


    
