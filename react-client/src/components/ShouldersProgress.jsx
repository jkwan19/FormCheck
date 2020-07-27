import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShouldersProgressItem from './ShouldersProgressItem.jsx'

const Item = styled.li`
  min-height: 350px;
  margin: 40px;
  list-style: none;
  border: 1px solid #77777769;
  background-color: #fdfdfd;
  border-radius: 4px;
  padding: 30px 50px 0px 50px;
  box-shadow: 0 0 1em #80808066;
`;
const Title = styled.div`
  font-size: 1.8em;
  font-family: 'Francois One';
  margin-bottom: 10px;
`;
function ShouldersProgress (props) {
  let progressList = props.progress[0];
  return(
    <ul>
      {
        progressList.map(progress =>
          <ShouldersProgressItem item={progress} />
        )
      }
    </ul>
  )
}

export default ShouldersProgress;