import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import CheckForm from './CheckForm.jsx';

const Wrapper = styled("div")``;
const Header = styled("h2")`
  font: 1.1 em;
  text-align: center;
`;
const Button = styled("div")`
  text-align: center;
  width: auto;
  &:hover {
    color: white;
    background-color: grey;
    cursor: pointer;
  }
`;
function Shoulders (props) {
  const [ form, setForm ] = useState(false);
  const [ workout, setWorkout ] = useState("Shoulder Press");
  const opts = {
    height: '300',
    width: '510',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const onReady = (e) => {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  }

  const handleClick = (e) => {
    e.preventDefault();
    setForm(true);
  }

  const renderView = () => {
    if (form === true) {
      return <CheckForm workout={workout}/>
    } else {
      return (
        <Wrapper>
          <Header>Dumbbell Shoulder Press Demo</Header>
          <YouTube videoId="B-aVuyhvLHU" opts={opts} onReady={onReady}/>
          <Button onClick={handleClick} > Check My Form </Button>
        </Wrapper>
      )
    }
  }
  return (
    <Wrapper>
      {renderView()}
    </Wrapper>
  )
}
export default Shoulders;