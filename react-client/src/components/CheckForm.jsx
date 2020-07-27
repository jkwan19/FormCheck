import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import PoseNet from "react-posenet";
import Camera from './Camera.jsx';

const inferenceConfig = {
  decodingMethod: "single-person"
};

function CheckForm (props) {
  const [count, checkPoses] = Camera();
  const onEstimate = useCallback(poses => checkPoses(poses), [checkPoses]);
  const workout = props.workout;
  return (
    <div>
      <h1>{`${workout}: ${count}`}</h1>
      <PoseNet
        style={{ width: "50%" }}
        facingMode="environment"
        inferenceConfig={inferenceConfig}
        onEstimate={onEstimate} />
    </div>
  )
}


export default CheckForm;