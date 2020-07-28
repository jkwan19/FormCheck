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
let isGoodForm;
function Camera (sensitivity = 10) {
  const [count, dispatch] = useReducer(reducer, 0);
  const standard = useRef(0);
  let isComingDown = false;
  const goingUp = () => {
    isComingDown = false;
  }
  const goingDown = () => {
    isComingDown = true;
  }
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
        // isUp = true;
        goingDown();
        standard.current = Math.max(standard.current, elbow.y);
        return;
      }
      const down = standard.current < (elbow.y + sensitivity);
      const downRange = (bodyPosition) => {
        return (300 <= Math.floor(bodyPosition) <= 360);
      };
      const tooLow = (bodyPosition) => {
        return (bodyPosition > 340);
      }
      if ((down && isComingDown) && !!wrist) {
        console.log('down');
        goingUp();
        dispatch("increment");
        //shoulder and elbow need to be in range of 300 => 320
        if (downRange(shoulder.y) && downRange(elbow.y)) {
          console.log('looking good');
          isGoodForm = true;
        }

        standard.current = 0
        return;
      }
      if (tooLow(elbow.y) && !isComingDown && !!wrist) {
        console.log('too low');
        isGoodForm = false;
      }
      const rest = !wrist;
      if (rest) {
        dispatch("reset");
      }
    },
    [sensitivity]
  );
  return [count, checkPoses];
}
export {Camera, isGoodForm};
// export default function(sensitivity = 10) {
//   const [count, dispatch] = useReducer(reducer, 0);
//   const [isComingDown, setComingDown] = useState(false);
//   const standard = useRef(0);
//   // let isUp;
//   // const goingUp = () => {
//   //   setComingDown(true);
//   // }
//   // const goingDown = () => {
//   //   setComingDown(false);
//   // }
//   // useEffect(() => {
//   //   setComingDown(isUp === true)
//   // }, [isUp]);
//   const checkPoses = useCallback(
//     poses => {
//       if (poses.length !== 1) {
//         return;
//       }
//       const {
//         leftShoulder,
//         rightShoulder,
//         leftElbow,
//         rightElbow,
//         leftWrist,
//         rightWrist
//       } = getKeypointsObject(poses[0]);
//       const elbow = leftElbow || rightElbow;
//       const shoulder = leftShoulder || rightShoulder;
//       if (!elbow || !shoulder) {
//         return;
//       }

//       const wrist = leftWrist || rightWrist;
//       const up = shoulder.y > elbow.y;

//       if (wrist && up) {
//         // goingUp();
//         isUp = true;
//         console.log('up', isComingDown);
//         standard.current = Math.max(standard.current, elbow.y);
//         return;
//       }
//       const down = standard.current < (elbow.y + sensitivity);
//       if ((down && isComingDown) && !!wrist) {
//         console.log('down');
//         // goingDown();
//         isUp = false;
//         dispatch("increment");
//         standard.current = 0
//         return;
//       }

//       // const hip = leftHip || rightHip


//       const rest = !wrist;
//       if (rest) {
//         dispatch("reset");
//       }
//     },
//     [sensitivity]
//   );
//   return [count, checkPoses];
// }