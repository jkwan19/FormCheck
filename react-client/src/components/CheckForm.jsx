import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import PoseNet from "react-posenet";
import {Camera, isGoodForm} from './Camera.jsx';

const inferenceConfig = {
  decodingMethod: "single-person"
};

function CheckForm (props) {
  const [count, checkPoses] = Camera();
  const onEstimate = useCallback(poses => checkPoses(poses), [checkPoses]);
  const workout = props.workout;
  const renderMessage = () => {
    if (isGoodForm) {
      return (<h3>{`Great work`}</h3>)
    } else if (isGoodForm == false) {
      return (<h3>{`You're getting there`}</h3>)
    } else {
      return (<h3>{`Let's get to work`}</h3>)
    }
  }
  return (
    <div>
      <h1>{`${workout}: ${count}`}</h1>
      {renderMessage()}
      <PoseNet
        style={{ width: "50%" }}
        facingMode="environment"
        inferenceConfig={inferenceConfig}
        onEstimate={onEstimate} />
    </div>
  )
}


export default CheckForm;