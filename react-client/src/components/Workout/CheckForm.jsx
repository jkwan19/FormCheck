import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import styled from 'styled-components';
import PoseNet from "react-posenet";
import { Camera, isGoodForm } from './Camera.jsx';

const Message = styled("h3")`
  font-size: 1.1 em;
  text-align: center;
`
const Header = styled("h2")`
  text-align: center;
`
const inferenceConfig = {
  decodingMethod: "single-person"
};

const randomizer = (array) => {
  let max = array.length;
  return Math.floor(Math.random() * (max));
}

function CheckForm(props) {
  const [count, checkPoses] = Camera();

  const onEstimate = useCallback(poses => checkPoses(poses), [checkPoses]);
  const workout = props.workout;
  const positiveMessage = [`Great work`];
  const improvementMessage = [`Elbows need to be leveled`];
  const renderMessage = () => {
    if (isGoodForm) {
      return (<Message>{positiveMessage[randomizer(positiveMessage)]}</Message>)
    } else if (isGoodForm == false) {
      return (<Message>{improvementMessage[randomizer(improvementMessage)]}</Message>)
    } else {
      return (<Message>{`Ready to rock`}</Message>)
    }
  }
  return (
    <div>
      <Header>{`${workout}: ${count}`}</Header>
      {renderMessage()}
      <PoseNet
        style={{ width: "100%" }}
        facingMode="environment"
        inferenceConfig={inferenceConfig}
        onEstimate={onEstimate} />
    </div>
  )
}


export default CheckForm;