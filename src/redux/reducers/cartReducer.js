import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../actions/cartActions"

import { ItemDrawer } from "../../components/ItemDrawer"
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"

const initialState = {
  items: [],
  cartPrice: {
    totalCartPrice: 0,
    tax: 0,
    totalCartPriceAfterTax: 0,
  },
}

// ...

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(ADD_TO_CART(item)),
  }
}

export default connect(null, mapDispatchToProps)(ItemDrawer)

// Helper function to calculate the price
const updatePrice = (items) => {
  const totalCartPrice = items.reduce((total, item) => total + item.price, 0)
  const tax = totalCartPrice * 0.0725
  const totalCartPriceAfterTax = totalCartPrice + tax
  return {
    totalCartPrice,
    tax,
    totalCartPriceAfterTax,
  }
}

const cartReducer = (state = initialState, action) => {
  let updatedItems, updatedPrice
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = {
        ...action.item,
        id: uuidv4(), // Generate a unique ID for the new item
      }
      updatedItems = [...state.items, newItem]
      updatedPrice = updatePrice(updatedItems)

      return {
        ...state,
        items: updatedItems,
        cartPrice: updatedPrice,
      }

    case REMOVE_FROM_CART:
      const itemId = action.itemId
      updatedItems = state.items.filter((item) => item.id !== itemId)
      updatedPrice = updatePrice(updatedItems)

      return {
        ...state,
        items: updatedItems,
        cartPrice: updatedPrice,
      }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        cartPrice: {
          totalCartPrice: 0,
          tax: 0,
          totalCartPriceAfterTax: 0,
        },
      }

    default:
      return state
  }
}

//export default cartReducer
