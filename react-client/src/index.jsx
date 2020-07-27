import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Workouts from './components/Workouts.jsx';
import Shoulders from './components/Shoulders.jsx';
import Planks from './components/Planks.jsx';
import Sleeping from './components/Sleeping.jsx';
import ShouldersProgress from './components/ShouldersProgress.jsx';
import PlanksProgress from './components/PlanksProgress.jsx';
import styled from 'styled-components';

const Header = styled.div`
  margin: 0px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Francois One';
`;
const Title = styled.span`
  margin-right: auto;
  margin-left: 10px;
  color: grey;
  font-weight: bold;
  font-size: 1.8em;
  font-family: 'Francois One';
`;
// const Progress = styled.span`
//   margin: 0px;
//   padding: 10px;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   font-family: 'Francois One';
//   padding: 5px;
//   margin-right: 5px;
//   font-size: 1.1em;
// `;
const Main = styled.div``;
function App() {
  const [ workouts, setWorkout ] = useState('');
  const [ value, setValue ] = useState('');
  const [ progress, setProgress ] = useState([]);
  const handleSelect = (e) => {
    setValue(e);
  }
  useEffect (()=> {
    getProgressList();
  })

  const getProgressList = () => {
    axios.get('/progress')
      .then(res => {
        setProgress([res.data]);
      })
      .catch(err => console.log('err', err));
  }

  const handleClick = (e) => {
    e.preventDefault();
    setWorkout(e.target.name);
    setValue('');
  }
  // let shouldersProgress = progress.filter((data) => data.workout.includes("Shoulders"));
  // let planksProgress = progress.filter((data) => data.workout.includes("Planks"));
  const renderView = () => {
    if (workouts === "shoulders") {
      return <Shoulders />
    } else if (workouts === "planks") {
      return <Planks />
    } else if (workouts === "sleeping") {
      return <Sleeping />
    } else if (value === "Shoulder Press") {
      return <ShouldersProgress progress={progress}/>
    } else if (value === "Planks") {
      return <PlanksProgress progress={progress}/>
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
    <Header>
      <Title onClick={handleClick} >Form Check</Title>
      <DropdownButton
        alignRight
        title="Check progress"
        id="dropdown-menu-align-right"
        onSelect = {handleSelect}
        >
          <Dropdown.Item eventKey="Shoulder Press">Shoulder Press</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="Planks">Planks</Dropdown.Item>
      </DropdownButton>
    </Header>
    <Main>{renderView()}</Main>
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));