import './index.css'

const DishCard = props => {
  const {details, additemonclick, removeitemonclick, value} = props
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

  const onclickdecrement = id => {
    removeitemonclick(id)
  }

  const onclickincrement = id => {
    additemonclick(id)
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
              onClick={() => onclickdecrement(dishId)}
            >
              -
            </button>
            <p>{value}</p>
            <button
              type="button"
              className="butt"
              onClick={() => onclickincrement(dishId)}
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
    </li>
  )
}

export default DishCard
