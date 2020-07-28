import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Workouts from './components/Workouts.jsx';
import Shoulders from './components/Shoulders.jsx';
import Planks from './components/Planks.jsx';
import Sleeping from './components/Sleeping.jsx';
import ShouldersProgress from './components/ShouldersProgress.jsx';
import PlanksProgress from './components/PlanksProgress.jsx';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    width: 40%;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    margin: auto;
  }
`
const Wrapper = styled("div")`
  overflow: hidden;
  background-color: #8d99ae;
`;

const Title = styled("a")`
  float: left;
  font-size: 16px;
  padding: 14px 16px;
  color: white;
  margin-right: auto;
  text-decoration: none;
  &:hover{
    cursor: pointer;
    background-color: grey;
  }
`

/* Dropdown Menus */
const DropDownContainer = styled("div")`
  float: left;
  padding: auto;
  margin-right: auto;
  overflow: hidden;
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
`;
const ProgressContainer = styled("div")`
  float: left;
  padding: auto;
  margin-right: auto;
  overflow: hidden;
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
`;
const DropDownHeader = styled("div")`
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  &:hover{
    cursor: pointer;
    background-color: grey;
  }
`;

const DropDownList = styled("div")`
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  &:hover{
    cursor: pointer;
    display: block;
  }
`;

const ListItem = styled("a")`
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover{
    cursor: pointer;
    background-color: grey;
  }
`;
const Header = styled("div")`
  list-style-type: none;
  margin: 0px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Francois One';
`;

/* Main Body */
const Main = styled("div")`
  font-size: 1.2em;
`;
const Content = styled("div")``;

/* App function */
function App() {
  const [ workouts, setWorkout ] = useState('');
  const [ value, setValue ] = useState('');
  const [ progress, setProgress ] = useState([]);
  const [ isWorkoutOpen, setWorkoutOpen ] = useState(false);
  const [ isProgressOpen, setProgressOpen ] = useState(false);

  const handleSelect = (e) => {
    console.log(e.currentTarget.textContent, 'click progress')
    setValue(e.currentTarget.textContent);
    setWorkout('');
  }

  const handleClick = (e) => {
    e.preventDefault();
    setWorkout(e.currentTarget.textContent);
    setValue('');
    setWorkoutOpen(false);
    setProgressOpen(false);
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

  const openWorkout = () => {
    setWorkoutOpen(!isWorkoutOpen);
    setProgressOpen(false);
  };

  const openProgress = () => {
    setProgressOpen(!isProgressOpen);
    setWorkoutOpen(false);
  };

  /* Render View */

  const renderView = () => {
    if (workouts === "Shoulder Press") {
      return <Shoulders />
    } else if (workouts === "Planks") {
      return <Planks />
    } else if (workouts === "Sleeping") {
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
  <Content>
    <GlobalStyle/>
    <Wrapper>
      <Header>
        <Title onClick={handleClick}>Home</Title>
        <DropDownContainer>
          <DropDownHeader onClick={openWorkout}>Workouts</DropDownHeader>
          {isWorkoutOpen && (
            <DropDownList>
              <ListItem onClick={handleClick}>Shoulder Press</ListItem>
              <ListItem onClick={handleClick}>Planks</ListItem>
              <ListItem onClick={handleClick}>Sleeping</ListItem>
            </DropDownList>

          )}
        </DropDownContainer>
        <ProgressContainer>
          <DropDownHeader onClick={openProgress}>Progress</DropDownHeader>
          {isProgressOpen && (
            <DropDownList>
              <ListItem onClick={handleSelect}>Shoulder Press</ListItem>
              <ListItem onClick={handleSelect}>Planks</ListItem>
            </DropDownList>
          )}
      </ProgressContainer>
      </Header>
    </Wrapper>
    <Main>
    {renderView()}
    </Main>

  </Content>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


