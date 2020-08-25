import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlanksProgressItem from './PlanksItem.jsx'

const Wrapper = styled('div') ``;
const List = styled("ul") `
  text-align: center;
`;

function Planks (props) {
  let progressList = props.progress[0];
  progressList = progressList.filter(progress => progress.workout === "Planks");
  return(
    <Wrapper>
      Planks Progress:
      <List>
        {
          progressList.map(progress =>
            <PlanksProgressItem item={progress} />
            )
          }
      </List>
    </Wrapper>
  )
}

export default Planks;