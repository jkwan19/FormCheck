import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Workouts from './components/Workouts.jsx';


function App() {
  const [ workout, setWorkout ] = useState();


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
    console.log(`Working ${e.target.name}`)
  }

  return (
  <div>
    <h1>Form Check</h1>
    <Workouts name="shoulders" onClick={handleClick} items={items}/>
  </div>)

}

ReactDOM.render(<App />, document.getElementById('app'));