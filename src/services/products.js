import axios from 'axios'
const baseUrl = '/api/products'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createProduct = async (newProduct,token) => {
    const response = await axios.post(baseUrl, newProduct, token)
    return response.data
}
const getProductsByid = async (username) => {
    const response = await axios.post('/api/users/getProducts', username)
    return response.data
}

const updateProduct = (id, changedProduct) => {
    const request = axios.put(`${baseUrl}/${id}`, changedProduct)
    return request.then(response => response.data)
}

const deleteProduct = async (id) => {
    const response =  await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

export default {getAll, createProduct, updateProduct, deleteProduct, getProductsByid}