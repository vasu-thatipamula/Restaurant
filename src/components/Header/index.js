import {Link} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {dishesDetails, cartList} = value
      console.log(dishesDetails)

      return (
        <div>
          <nav className="navbar">
            <Link to="/">
              <button type="button">Restaurant</button>
            </Link>
            <div className="row">
              <p className="Text">My Orders</p>
              <Link to="/cart">
                <button type="button" data-testid="cart">
                  <AiOutlineShoppingCart size={40} />
                </button>
                <span className="Items">{cartList.length}</span>
              </Link>
            </div>
          </nav>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Header
