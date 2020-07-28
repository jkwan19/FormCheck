import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShouldersProgressItem from './ShouldersItem.jsx'

const List = styled("ul") `
  width: 40%;
  text-align: center;
`;
function Shoulders (props) {
  let progressList = props.progress[0];
  return(
    <List>
      {
        progressList.map(progress =>
          <ShouldersProgressItem item={progress} />
        )
      }
    </List>
  )
}

export default Shoulders;