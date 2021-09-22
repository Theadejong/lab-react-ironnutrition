import './App.css';
import foodsData from "./foods.json";
import {useState} from 'react';
import FoodBox from './component/FoodBox'
import { Row } from 'antd';
import AddFoodForm from './component/AddFoodForm';
import SearchFood from './component/SearchFood';

function App() {

  const [foods, setFood] = useState(foodsData);
  const [searchInput, setSearchInput] = useState('')
  const [foodsCopy, setFoodsData] = useState(foodsData)

  //function to add a food
  const addNewFood = (newFood)=>{
    const updatedFoodData = [...foods, newFood]
    const updatedFoodCopy = [...foods, newFood]
    setFood(updatedFoodData)
    setFoodsData(updatedFoodCopy)
  }

  //function to filter 
  const searchFoodFilter = (e) =>{
    console.log(e)
    setSearchInput(e.target.value)

    if(e.target.value === ''){
      setFood(foods)
    }

    const textInputValue = e.target.value.toLowerCase();

    const filteredList = foodsCopy.filter((food)=>{
      const foodIncludes = food.name.toLowerCase();
      return foodIncludes.includes(textInputValue);

    })
    setFood(filteredList)
    }

  
    const deleteFood = (name) =>{
      const foodToDelete = foodsCopy.filter((food)=>{
        return food.name.toLowerCase() !== name.toLowerCase()
      })
      setFood(foodToDelete)
    }
  
  
  return (
    <div className="App">

      <AddFoodForm addFood={addNewFood}/>
      <h2>Food List</h2>

      <SearchFood searchInput={searchInput} searchFoodFilter={searchFoodFilter} />

      <Row>
      {foods.map(food => {
        return (
          <FoodBox food={food} key={food.name} deleteFood={deleteFood}/>
        )}
        )}
      
      </Row>
    
      
      </div>
  )
}

export default App;
