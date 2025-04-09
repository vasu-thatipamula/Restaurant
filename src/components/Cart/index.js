import Header from '../Header'
import CartDishCard from '../CartDishCard'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        removeAllCartItems,

        cartList,
      } = value

      const len = cartList.length

      const onClickRemoveall = () => {
        removeAllCartItems()
      }

      return (
        <div>
          <Header />
          {len > 0 ? (
            <div>
              <h1>Cart Items</h1>
              <ul>
                {cartList.map(each => (
                  <CartDishCard details={each} key={each.dishId} />
                ))}
              </ul>
              <button type="button" onClick={onClickRemoveall}>
                Remove All
              </button>
            </div>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="Empty Cart"
                className=""
              />
              <p>Your Cart is Empty</p>
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
