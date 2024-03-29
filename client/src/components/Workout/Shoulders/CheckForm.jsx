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

function CheckForm(props) {
  const [count, checkPoses] = Camera();

  const onEstimate = useCallback(poses => checkPoses(poses), [checkPoses]);
  const workout = props.workout;
  const positiveMessage = `Great work`;
  const improvementMessage = `Elbows need to be leveled`;
  const renderMessage = () => {
    if (isGoodForm) {
      return (<Message>{positiveMessage}</Message>)
    } else if (isGoodForm == false) {
      return (<Message>{improvementMessage}</Message>)
    } else {
      return (<Message>{`Let's burn some calories`}</Message>)
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