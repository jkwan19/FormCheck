import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShouldersProgressItem from './ShouldersItem.jsx'

const Wrapper = styled('div') ``;
const List = styled("ul") `
  text-align: center;
`;
function Shoulders (props) {
  let progressList = props.progress[0];
  progressList = progressList.filter(progress => progress.workout === "Shoulders");
  return(
    <Wrapper>
      Shoulder Press Progress:
      <List>
        {
          progressList.map(progress =>
            <ShouldersProgressItem item={progress} />
            )
          }
      </List>
    </Wrapper>
  )
}

export default Shoulders;