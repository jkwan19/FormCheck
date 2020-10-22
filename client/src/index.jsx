import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
// import Workouts from './components/Workouts.jsx';
// import Shoulders from './components/Workout/Shoulders.jsx';
// import Planks from './components/Workout/Planks.jsx';
// import Sleeping from './components/Workout/Sleeping.jsx';
// import ShouldersProgress from './components/Progress/Shoulders.jsx';
// import PlanksProgress from './components/Progress/Planks.jsx';
// import ProgressForm from './components/Form/ProgressForm.jsx';
// import styled, { createGlobalStyle } from 'styled-components';
import Menu from './Menu.jsx'

// const GlobalStyle = createGlobalStyle`
//   html, body {
//     margin: 0;
//     padding: 0;
//   }
//   *, *::after, *::before {
//     box-sizing: border-box;
//   }
//   body {
//     align-items: center;
//     display: flex;
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
//     height: 100vh;
//     justify-content: center;
//     text-rendering: optimizeLegibility;
//   }
// `
// const Wrapper = styled("div")`
//   overflow: hidden;
//   background-color: #8d99ae;
//   width: 100%;
// `;
// /* Header */

// const Title = styled("a")`
//   width: 100%;
//   float: left;
//   font-size: 16px;
//   padding: 14px 16px;
//   color: white;
//   margin-right: auto;
//   text-decoration: none;
//   &:hover{
//     cursor: pointer;
//     background-color: grey;
//   }
// `;

// /* Dropdown Menus */
// const DropDownContainer = styled("div")`
//   float: left;
//   padding: auto;
//   margin-right: auto;
//   overflow: hidden;
//   font-size: 16px;
//   border: none;
//   outline: none;
//   color: white;
//   background-color: inherit;
//   font-family: inherit;
//   width: 100%;
// `;
// const ProgressContainer = styled("div")`
//   float: left;
//   padding: auto;
//   margin-right: auto;
//   overflow: hidden;
//   font-size: 16px;
//   border: none;
//   outline: none;
//   color: white;
//   background-color: inherit;
//   font-family: inherit;
//   width: 100%;
// `;
// const DropDownHeader = styled("div")`
//   font-size: 16px;
//   border: none;
//   outline: none;
//   color: white;
//   padding: 14px 16px;
//   background-color: inherit;
//   font-family: inherit;
//   width: 100%;
//   margin: 0;
//   &:hover{
//     cursor: pointer;
//     background-color: grey;
//   }
// `;

// const DropDownList = styled("div")`
//   font-size: 16px;
//   border: none;
//   outline: none;
//   color: white;
//   padding: 14px 16px;
//   background-color: inherit;
//   font-family: inherit;
//   margin: 0;
//   position: absolute;
//   background-color: #f9f9f9;
//   min-width: 160px;
//   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
//   z-index: 1;
//   &:hover{
//     cursor: pointer;
//     display: block;
//   }
// `;

// const ListItem = styled("a")`
//   float: none;
//   color: black;
//   padding: 12px 16px;
//   text-decoration: none;
//   display: block;
//   text-align: left;
//   &:hover{
//     cursor: pointer;
//     color: white;
//     background-color: grey;
//   }
// `;
// const Header = styled("div")`
//   list-style-type: none;
//   margin: 0px;
//   padding: 10px;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   font-family: 'Francois One';
//   width: 100%;
// `;

// /* Main Body */
// const Main = styled("div")`
//   font-size: 1.2em;
// `;

// const Content = styled("div")``;

// /* Motivational Image */
// const Image = styled("img")`
//   width: 100%;
// `
// /* App function */
// function App() {
//   const [ workouts, setWorkout ] = useState('');
//   const [ value, setValue ] = useState('');
//   const [ progress, setProgress ] = useState([]);
//   const [ isWorkoutOpen, setWorkoutOpen ] = useState(false);
//   const [ isProgressOpen, setProgressOpen ] = useState(false);
//   const [ isMenuOpen, setMenuOpen ] = useState(false);
//   const node = useRef();
//   const menuId = "main-menu";

//   /* Handle Menu Burger */
//   useOnClickMenu(node, () => setMenuOpen(false));

//   /* Select Progress List */
//   const handleSelect = (e) => {
//     setValue(e.currentTarget.textContent);
//     setWorkout('');
//     setProgressOpen(false);
//   }

//   /* Handle Workout Routine */
//   const handleClick = (e) => {
//     setWorkout(e.currentTarget.textContent);
//     setValue('');
//     setWorkoutOpen(false);
//   }

//   const openWorkout = () => {
//     setWorkoutOpen(!isWorkoutOpen);
//     setProgressOpen(false);
//   };

//   const openProgress = () => {
//     setProgressOpen(!isProgressOpen);
//     setWorkoutOpen(false);
//   };

//   /* Get list of progress */
//   const getProgressList = () => {
//     axios.get('/progress')
//       .then(res => {
//         setProgress([res.data]);
//       })
//       .catch(err => console.log('err', err));
//   }

//   /* Add to progress tracker */
//   const addToProgressList = (data) => {
//     axios.post('/progress', data)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err))
//   }

//   useEffect (()=> {
//     getProgressList();
//   })

//   /* Render View */

//   const renderView = () => {
//     if (workouts === "Shoulder Press") {
//       return <Shoulders />
//     } else if (workouts === "Planks") {
//       return <Planks />
//     } else if (workouts === "Sleeping") {
//       return <Sleeping />
//     } else if (value === "Shoulder Press") {
//       return <ShouldersProgress progress={progress}/>
//     } else if (value === "Planks") {
//       return <PlanksProgress progress={progress}/>
//     } else if (value === "Add Progress") {
//       return <ProgressForm handleForm={addToProgressList}/>
//     } else {
//       return (
//         <div>
//           <Workouts onClick={handleClick}/>
//           {/* <Image src="http://www.gymquotes.co/wp-content/uploads/2017/11/push-yourself-to-your-limits-thats-how-you-truly-grow-motivational-gym-quotes.jpg"></Image> */}
//         </div>
//       )
//     }
//   }

//   return (
//       <Content>
//         <GlobalStyle />
//         <Wrapper>
//           <Header>
//             <Title onClick={handleClick}>Home</Title>
//             <DropDownContainer>
//               <DropDownHeader onClick={openWorkout}>Workouts</DropDownHeader>
//               {isWorkoutOpen && (
//                 <DropDownList>
//                   <ListItem onClick={handleClick}>Shoulder Press</ListItem>
//                   <ListItem onClick={handleClick}>Planks</ListItem>
//                   <ListItem onClick={handleClick}>Sleeping</ListItem>
//                 </DropDownList>
//               )}
//             </DropDownContainer>
//             <ProgressContainer>
//               <DropDownHeader onClick={openProgress}>Progress</DropDownHeader>
//               {isProgressOpen && (
//                 <DropDownList>
//                   <ListItem onClick={handleSelect}>Shoulder Press</ListItem>
//                   <ListItem onClick={handleSelect}>Planks</ListItem>
//                 </DropDownList>
//               )}
//             </ProgressContainer>
//             <Title onClick={handleSelect}>Add Progress</Title>
//           </Header>
//         </Wrapper>
//         <Main>
//         {renderView()}
//         </Main>
//       </Content>
//   )
// }

ReactDOM.render(<Menu />, document.getElementById('app'));


