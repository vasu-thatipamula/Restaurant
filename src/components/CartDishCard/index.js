import CartContext from '../../context/CartContext'
import './index.css'

const CartDishCard = props => {
  const {details} = props
  const {
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishId,
    dishPrice,
    dishType,
    quantity,
  } = details

  return (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,

          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onclickdecrement = () => {
          decrementCartItemQuantity(details)
        }

        const onclickincrement = () => {
          incrementCartItemQuantity(details)
        }

        const onClickremove = () => {
          removeCartItem(dishId)
        }

        return (
          <li className="Card">
            <div className={dishType === 2 ? 'vegType' : 'Nonvegtype'} />
            <div>
              <h1>{dishName}</h1>
              <p>
                {dishCurrency} {dishPrice}
              </p>
              <p>{dishDescription}</p>

              {dishAvailability === true ? (
                <div className="Bar">
                  <button
                    type="button"
                    className="butt"
                    onClick={onclickdecrement}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    type="button"
                    className="butt"
                    onClick={onclickincrement}
                  >
                    +
                  </button>
                </div>
              ) : (
                <>
                  <p>Not Available</p>
                </>
              )}

              {addonCat.length > 0 && <p>Customizations available</p>}
            </div>
            <p className="cal">{dishCalories} Calories</p>
            <img src={dishImage} alt={dishName} className="dishImg" />
            <button type="button" onClick={onClickremove}>
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartDishCard
