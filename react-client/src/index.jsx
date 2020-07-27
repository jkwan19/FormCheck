import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Workouts from './components/Workouts.jsx';
import Shoulders from './components/Shoulders.jsx';
import Planks from './components/Planks.jsx';
import Sleeping from './components/Sleeping.jsx';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`;

function App() {
  const [ workouts, setWorkout ] = useState('');
  // const [ items, setItems ] = useState([])

  // useEffect (()=> {
  //   $.ajax({
  //     url: '/items',
  //     success: (data) => {
  //       setItems([...items, data])
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // })

  const handleClick = (e) => {
    e.preventDefault();
    setWorkout(e.target.name);
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
        <Workouts onClick={handleClick}/>
      </div>
      )
    }
  }

  return (
  <div>
    <Title onClick={handleClick}>Form Check</Title>
    {renderView()}
  </div>)

}

ReactDOM.render(<App />, document.getElementById('app'));