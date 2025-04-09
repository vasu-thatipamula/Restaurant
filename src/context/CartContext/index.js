import React from 'react'

const CartContext = React.createContext({
  cartList: [],

  isQuantityAdded: false,
  removeAllCartItems: () => {},
  addCartItem: () => {},

  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  dishesDetails: [],
  updatedishesDetails: () => {},
  updateCategory: () => {},
  addedItems: [],
  setAddedItems: () => {},
})

export default CartContext
