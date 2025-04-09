import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

// write your code here
class App extends Component {
  state = {
    cartList: [],
    dishesDetails: [],
    cartCount: 0,
    selectedCategory: '',
    isQuantityAdded: false,
    categoryData: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = (details, quant) => {
    const {cartList} = this.state
    const exists = cartList.some(each => each.dishId === details.dishId)
    if (exists === true) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.dishId === details.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList,
          {...details, quantity: quant === 0 ? 1 : quant},
        ],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const remaining = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: remaining})
  }

  incrementCartItemQuantity = details => {
    const {cartList} = this.state
    const exists = cartList.some(each => each.dishId === details.dishId)
    if (exists === true) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.dishId === details.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...details, quantity: 1}],
      }))
    }
  }

  decrementCartItemQuantity = details => {
    const {cartList} = this.state
    const item = cartList.find(each => each.dishId === details.dishId)
    console.log(item)

    if (!item || item.quantity === undefined) {
      return null
    }

    if (item.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each =>
          each.dishId === details.dishId
            ? {...each, quantity: each.quantity - 1}
            : each,
        ),
      }))
    } else {
      this.removeCartItem(details.dishId)
    }

    return null
  }

  updatedishesDetails = updatedData => {
    this.setState({
      dishesDetails: updatedData,
      selectedCategory:
        updatedData.length > 0
          ? updatedData[0].tableMenuList[0].menuCategory
          : '',
    })
  }

  updateCategory = category => {
    this.setState({selectedCategory: category})
  }

  setCartCount = count => {
    this.setState({cartCount: count})
  }

  render() {
    const {
      cartList,
      dishesDetails,
      selectedCategory,
      cartCount,
      isQuantityAdded,
      categoryData,
    } = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          isQuantityAdded,
          cartCount,
          categoryData,
          dishesDetails,
          selectedCategory,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          setCartCount: this.setCartCount,
          updateCategory: this.updateCategory,
          updatedishesDetails: this.updatedishesDetails,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          addCartItem: this.addCartItem,
          setcategoryData: this.setcategoryData,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
