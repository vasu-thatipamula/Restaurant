import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishCard = props => {
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
  } = details

  const [quant, setQuant] = useState(0)
  const [isAddcartRequired, setIsAddcartRequired] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          addCartItem,
        } = value

        if (quant > 0 && dishAvailability === true) {
          setIsAddcartRequired(true)
        }

        console.log(isAddcartRequired)

        const onClickAddtoCart = () => {
          addCartItem(details, quant)
        }

        const onclickdecrement = () => {
          decrementCartItemQuantity(details)
          if (quant > 1) {
            setQuant(prevState => prevState - 1)
          } else {
            setQuant(0)
          }
        }

        const onclickincrement = () => {
          incrementCartItemQuantity(details)
          setQuant(prevState => prevState + 1)
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
              <div className="row">
                {dishAvailability === true ? (
                  <div className="Bar">
                    <button
                      type="button"
                      className="butt"
                      onClick={onclickdecrement}
                    >
                      -
                    </button>
                    <p>{quant}</p>
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
              </div>
              {isAddcartRequired && (
                <button type="button" onClick={onClickAddtoCart}>
                  ADD TO CART
                </button>
              )}

              {addonCat.length > 0 && <p>Customizations available</p>}
            </div>
            <p className="cal">{dishCalories} Calories</p>
            <img src={dishImage} alt={dishName} className="dishImg" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishCard
