import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function Planks () {
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
      <h2>It's Planking Time</h2>
      <YouTube videoId="pSHjTRCQxIw" opts={opts} onReady={onReady} />
    </div>
  )
}

export default Planks