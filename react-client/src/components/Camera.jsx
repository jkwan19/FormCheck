import React, { useRef, useReducer, useCallback, useState, useEffect } from "react"

function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position
    return acc
  }, {})
}

function reducer(count, action) {
  if (action === "reset") {
    return 0;
  }
  return count + 1;
}

export default function(sensitivity = 10) {
  const [count, dispatch] = useReducer(reducer, 0);
  const [isComingDown, setComingDown] = useState(false);
  const standard = useRef(0);
  let isUp;
  // const goingUp = () => {
  //   setComingDown(true);
  // }
  // const goingDown = () => {
  //   setComingDown(false);
  // }
  useEffect(() => {
    setComingDown(isUp === true)
  }, [isUp]);
  const checkPoses = useCallback(
    poses => {
      if (poses.length !== 1) {
        return;
      }
      const {
        leftShoulder,
        rightShoulder,
        leftElbow,
        rightElbow,
        leftWrist,
        rightWrist
      } = getKeypointsObject(poses[0]);
      const elbow = leftElbow || rightElbow;
      const shoulder = leftShoulder || rightShoulder;
      if (!elbow || !shoulder) {
        return;
      }

      const wrist = leftWrist || rightWrist;
      const up = shoulder.y > elbow.y;

      if (wrist && up) {
        // goingUp();
        isUp = true;
        console.log('up', isComingDown);
        standard.current = Math.max(standard.current, elbow.y);
        return;
      }
      const down = standard.current < (elbow.y + sensitivity);
      if ((down && isComingDown) && !!wrist) {
        console.log('down');
        // goingDown();
        isUp = false;
        dispatch("increment");
        standard.current = 0
        return;
      }

      // const hip = leftHip || rightHip


      const rest = !wrist;
      if (rest) {
        dispatch("reset");
      }
    },
    [sensitivity]
  );
  return [count, checkPoses];
}