import React, {useState, useEffect} from 'react';
import './App.css';
import productService from './services/products'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Home from './components/Home'
import Products from './components/Products'
import Product from './components/Product'
import Button from './components/Button'

import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"


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

  //handle logout
  const logoutHandler = () => {
    setUser(null)
  }

  //handle user login
  const userLoginHandler = (user) => {
    setUser(user)
  }

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
            <Link style={padding} to="/products">products</Link>
            <Link style={padding} to="/users">users</Link>
            {user !== null
              ? <span>
                  <em> {user.name} logged in </em> 
                  <Button eventHandler={logoutHandler} text="logout"/>
                </span>
              : <Link style={padding} to="/login">login</Link>
            }
        </div>
        
        <Switch>
            <Route path="/products/:id">
              <Product products={products} />
            </Route>
            <Route path="/products">
              <Products products={products} user={user} updateProductHandler={updateProductHandler} />
            </Route>
            <Route path="/login">
              <LoginForm user={user} userLoginHandler={userLoginHandler}/>
            </Route>
            <Route path="/users">
              {user ? <Users /> : <Redirect to="/login" />}
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


    
