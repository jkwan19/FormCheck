import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Workouts from './components/Workouts.jsx';
import Shoulders from './components/Shoulders.jsx';
import Planks from './components/Planks.jsx';
import Sleeping from './components/Sleeping.jsx';


function App() {
  const [ workouts, setWorkout ] = useState('');
  const [ items, setItems ] = useState([])

  useEffect (()=> {
    $.ajax({
      url: '/items',
      success: (data) => {
        setItems([...items, data])
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  })

  const handleClick = (e) => {
    e.preventDefault();
    setWorkout(e.target.name);
    console.log(`Working ${workouts}`);
  }

  const renderView = () => {
    if (workouts === "shoulders") {
      return <Shoulders />
    } else if (workouts === "planks") {
      return <Planks />
    } else if (workouts === "sleeping") {
      return <Sleeping />
    } else {
      return (
      <div>
        <Workouts onClick={handleClick} items={items}/>
      </div>
      )
    }
  }

  return (
  <div>
    <h1 onClick={handleClick}>Form Check</h1>
    {renderView()}
  </div>)

}

ReactDOM.render(<App />, document.getElementById('app'));