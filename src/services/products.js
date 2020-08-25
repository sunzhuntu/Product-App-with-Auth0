import axios from 'axios'
const baseUrl = '/api/products'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createNote = (newProduct) => {
    const request = axios.post(baseUrl, newProduct)
    return request.then(response => response.data)
}

const updateNote = (id, changedProduct) => {
    const request = axios.put(`${baseUrl}/${id}`, changedProduct)
    return request.then(response => response.data)
}

export default {getAll, createNote, updateNote}
// export default {
//     getAll: getAll,
//     createNote: createNote,
//     updateNote: updateNote
// }