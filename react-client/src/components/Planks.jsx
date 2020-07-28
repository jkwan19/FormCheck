import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import CheckForm from './CheckForm.jsx';

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
        <div>
          <h2>Planks Demo</h2>
          <YouTube videoId="pSHjTRCQxIw" opts={opts} onReady={onReady} />
          <button onClick={handleClick} key="Planks"> Check My Form </button>
        </div>
      )
    }
  }
  return (
    <div>
      {renderView()}
    </div>
  )
}

export default Planks