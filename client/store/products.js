import axios from 'axios'
import {DELETE_SINGLE_PRODUCT} from './product'
const ALL_PRODUCTS = 'ALL_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

const updateProduct = product => {
  console.log('product', product)
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

const allProducts = products => {
  return {
    type: ALL_PRODUCTS,
    products
  }
}

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const filterProducts = filter => {
  return {
    type: FILTER_PRODUCTS,
    filter
  }
}

export const deleteSingleProduct = id => {
  return {
    type: DELETE_SINGLE_PRODUCT,
    id
  }
}

export const getAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(allProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postProductThunk = product => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/products', product)
      const newProduct = response.data
      dispatch(addProduct(newProduct))
    } catch (err) {
      console.log('there was an error posting the product', err)
    }
  }
}

export const deleteProductThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`, id)
      dispatch(deleteSingleProduct(id))
    } catch (err) {
      console.log('there was an error deleting the product: ', err)
    }
  }
}

export const updateProductThunk = (product, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${id}`, product)
      dispatch(updateProduct(data))
    } catch (err) {
      console.log('there was an error deleting the product: ', err)
    }
  }
}

export const filterProductThunk = filter => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/products/filter/${filter}`)
      const prods = response.data
      dispatch(filterProducts(prods))
    } catch (err) {
      console.log('you dumb motherfucker')
    }
  }
}

const initialState = []

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products
    case DELETE_SINGLE_PRODUCT:
      return [...state].filter(product => {
        if (action.id !== product.id) {
          return product
        }
      })
    case UPDATE_PRODUCT:
      return action.product
    case ADD_PRODUCT:
      return [...state, action.product]
    case FILTER_PRODUCTS:
      console.log(state)
      return action.filter
    default:
      return state
  }
}
export default allProductsReducer
//s
