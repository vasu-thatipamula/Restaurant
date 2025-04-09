import {useContext, useEffect, useState} from 'react'
import {useHistory, Link} from 'react-router-dom'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import DishCard from '../DishCard'
import './index.css'

const apiStatusList = {
  initial: 'Initial',
  progress: 'Progress',
  success: 'Success',
  failure: 'Failure',
}

const Restaurant = () => {
  const {
    updatedishesDetails,
    dishesDetails,
    selectedCategory,
    updateCategory,
    cartList,

    setcategoryData,
  } = useContext(CartContext)

  const history = useHistory()

  const [apiStatus, setApiStatus] = useState(apiStatusList.initial)

  // console.log(cartList.length)

  useEffect(() => {
    setApiStatus(apiStatusList.progress)
    const fetchedData = async () => {
      const apiurl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

      const response = await fetch(apiurl)
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = data.map(eachinit => ({
          branchName: eachinit.branch_name,
          nexturl: eachinit.nexturl,
          restaurantId: eachinit.restaurant_id,
          restaurantImage: eachinit.restaurant_image,
          restaurantName: eachinit.restaurant_name,
          tableId: eachinit.table_id,
          tableMenuList: eachinit.table_menu_list.map(eachList => ({
            categoryDishes: eachList.category_dishes.map(eachdish => ({
              addonCat: eachdish.addonCat.map(eachaddon => ({
                addonCategory: eachaddon.addon_category,
                addonCategoryId: eachaddon.addon_category_id,
                addonSelection: eachaddon.addon_selection,
                addons: eachaddon.addons.map(each => ({
                  dishAvailability: each.dish_Availability,
                  dishType: each.dish_Type,
                  dishCalories: each.dish_calories,
                  dishCurrency: each.dish_currency,
                  dishDescription: each.dish_description,
                  dishId: each.dish_id,
                  dishImage: each.dish_image,
                  dishName: each.dish_name,
                  dishPrice: each.dish_price,
                })),
                nexturl: eachaddon.nexturl,
              })),
              dishAvailability: eachdish.dish_Availability,
              dishType: eachdish.dish_Type,
              dishCalories: eachdish.dish_calories,
              dishCurrency: eachdish.dish_currency,
              dishDescription: eachdish.dish_description,
              dishId: eachdish.dish_id,
              dishImage: eachdish.dish_image,
              dishName: eachdish.dish_name,
              dishPrice: eachdish.dish_price,
              nexturl: eachdish.nexturl,
              quantity: 0,
            })),
            menuCategory: eachList.menu_category,
            menuCategoryId: eachList.menu_category_id,
            menuCategoryImage: eachList.menu_category_image,
            nexturl: eachList.nexturl,
          })),
          tableName: eachinit.table_name,
        }))

        updatedishesDetails(updatedData)
        setApiStatus(apiStatusList.success)
      } else {
        setApiStatus(apiStatusList.failure)
      }
    }
    fetchedData()
  }, [updatedishesDetails])

  const onclickcategory = value => {
    updateCategory(value)
    // this.setState({selectedCategory: value
  }

  const onClicklogout = () => {
    Cookies.remove('jwt_token')
    // const {history} = this.props
    history.replace('/login')
  }

  if (dishesDetails.length === 0) {
    return <p>Loading...</p>
  }

  const categories = dishesDetails[0].tableMenuList
  const item = dishesDetails[0].tableMenuList.filter(
    each => each.menuCategory === selectedCategory,
  )
  const dishes = item.length > 0 ? item[0].categoryDishes : []

  // console.log(item)

  const rendersuccessview = () => (
    <div>
      <nav className="navbar">
        <Link to="/">
          <button type="button">{dishesDetails[0].restaurantName}</button>
        </Link>
        <div className="row">
          <p className="Text">My Orders</p>
          <Link to="/cart">
            <button type="button" data-testid="cart">
              <AiOutlineShoppingCart size={40} />
            </button>
          </Link>
          <span className="Items">{cartList.length}</span>
        </div>
        <button type="button" onClick={onClicklogout}>
          Logout
        </button>
      </nav>
      <div>
        <ul className="Tabs">
          {categories.map(each => (
            <li key={each.menuCategoryId}>
              <button
                type="button"
                onClick={() => onclickcategory(each.menuCategory)}
                className={
                  selectedCategory === each.menuCategory
                    ? 'tabunderline'
                    : 'tabnormal'
                }
              >
                {each.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {dishes.map(each => (
            <DishCard details={each} key={each.dishId} />
          ))}
        </ul>
      </div>
    </div>
  )

  const renderLoadingview = () => <p>Loading...</p>

  const renderfailureview = () => <p>Your response has been failed </p>

  const renderHomeResponse = () => {
    switch (apiStatus) {
      case apiStatusList.progress:
        return renderLoadingview()

      case apiStatusList.success:
        return rendersuccessview()
      case apiStatusList.failure:
        return renderfailureview()
      default:
        return null
    }
  }

  return (
    <div>
      <div>{renderHomeResponse()}</div>
    </div>
  )
}

export default Restaurant
