import React, { useState, useEffect } from 'react';
import ListItem from './ListItem.jsx';

const Workouts = (props) => (
  <div>
    <h4> What are we working on today? </h4>
    <button name="shoulders" onClick={props.onClick}>Dumbbell Shoulder Press</button>
    <button name="planks" onClick={props.onClick}>Planks</button>
    <button name="sleeping" onClick={props.onClick}>Sleeping</button>
  </div>
)

export default Workouts;