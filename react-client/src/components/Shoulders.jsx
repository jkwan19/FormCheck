import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function Shoulders () {
  const opts = {
    height: '300',
    width: '540',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  const onReady = (e) => {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  }
  return (
    <div>
      <h2>It's Shoulder Time</h2>
      <YouTube videoId="B-aVuyhvLHU" opts={opts} onReady={onReady} />
    </div>
  )
}
export default Shoulders