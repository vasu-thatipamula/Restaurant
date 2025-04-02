import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import DishCard from '../DishCard'
import './index.css'

class Restaurant extends Component {
  state = {
    dishesDetails: [],
    cartitems: {},
    selectedCategory: '',
  }

  componentDidMount() {
    this.getRestaurantdetails()
  }

  getRestaurantdetails = async () => {
    const apiurl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(apiurl)
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
        })),
        menuCategory: eachList.menu_category,
        menuCategoryId: eachList.menu_category_id,
        menuCategoryImage: eachList.menu_category_image,
        nexturl: eachList.nexturl,
      })),
      tableName: eachinit.table_name,
    }))
    // console.log(data)
    // console.log(updatedData[0].tableMenuList)
    this.setState({
      dishesDetails: updatedData,
      selectedCategory:
        updatedData.length > 0
          ? updatedData[0].tableMenuList[0].menuCategory
          : '',
    })
  }

  onclickcategory = value => {
    this.setState({selectedCategory: value})
  }

  additemonclick = id => {
    this.setState(prevState => ({
      cartitems: {
        ...prevState.cartitems,
        [id]: (prevState.cartitems[id] || 0) + 1,
      },
    }))
  }

  removeitemonclick = id => {
    this.setState(prevState => ({
      cartitems: {
        ...prevState.cartitems,
        [id]: Math.max((prevState.cartitems[id] || 0) - 1, 0),
      },
    }))
  }

  render() {
    const {dishesDetails, cartitems, selectedCategory} = this.state

    if (dishesDetails.length === 0) {
      return <p>Loading...</p>
    }

    const categories = dishesDetails[0].tableMenuList
    const item = dishesDetails[0].tableMenuList.filter(
      each => each.menuCategory === selectedCategory,
    )
    const dishes = item[0].categoryDishes
    // console.log(item)

    const cartCount = Object.values(cartitems).reduce(
      (init, curr) => init + curr,
      0,
    )

    return (
      <div>
        <nav className="navbar">
          <h1>{dishesDetails[0].restaurantName}</h1>
          <div className="row">
            <p className="Text">My Orders</p>
            <AiOutlineShoppingCart size={40} />
            <span className="Items">{cartCount}</span>
          </div>
        </nav>
        <div>
          <ul className="Tabs">
            {categories.map(each => (
              <li key={each.menuCategoryId}>
                <button
                  type="button"
                  onClick={() => this.onclickcategory(each.menuCategory)}
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
              <DishCard
                details={each}
                key={each.dishId}
                value={cartitems[each.dishId] || 0}
                additemonclick={this.additemonclick}
                removeitemonclick={this.removeitemonclick}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Restaurant
