import React, { useState } from 'react'
import productService from '../services/products'
import { useAuth0 } from "@auth0/auth0-react";


const ProductForm = ({ user, products, updateProductHandler }) => {
  const [newProductTitle, setNewProductTitle] = useState('a new product title')
  const [newProductCategory, setNewProductCategory] = useState('a new product category')
  const { getAccessTokenSilently } = useAuth0() // Get the tokoen
  //use async-await syntax, and wait for the token 
  const addProduct = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const productObject = {
      title: newProductTitle,
      category: newProductCategory,
      available: Math.random() > 0.5,
      userid: user.sub //add user id
    }
    const token = await getAccessTokenSilently()
    productService
      .createProduct(productObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(returnedProduct => {
        console.log(returnedProduct)
        const updatedProducts = products.concat(returnedProduct)
        updateProductHandler(updatedProducts)
        setNewProductTitle('a new product name')
        setNewProductCategory('a new product category')
      })
  }

  return (
    <div>
      <h3> Add New Products </h3>
      <form onSubmit={addProduct}>
        <input
          value={newProductTitle}
          onChange={(event) => setNewProductTitle(event.target.value)}
        />
        <input
          value={newProductCategory}
          onChange={(event) => setNewProductCategory(event.target.value)}
        />
        <button type="submit"> Save </button>
      </form>
    </div>
  )
}

export default ProductForm