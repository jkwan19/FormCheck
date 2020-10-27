import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import CheckForm from './Planks/CheckForm.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Wrapper = styled("div")``;
const Header = styled("h2")`
  font: 1.1 em;
  text-align: center;
`;

const VideoContainer = styled("div")`
  text-align: center;
  margin: auto;
`

function Planks (props) {
  const [ form, setForm ] = useState(false);
  const [ workout, setWorkout ] = useState("Planks");
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
          <Header>Planks Demo</Header>
          <VideoContainer>
            <YouTube videoId="pSHjTRCQxIw" opts={opts} onReady={onReady}/>
          </VideoContainer>
          <Button onClick={handleClick} variant="contained" color="primary">
            Check My Form
          </Button>
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

export default Planks