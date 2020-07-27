import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function ShouldersProgressItem (props) {
  return (
    <ul>
      <div>{props.item.date_posted}</div>
        <img src={props.item.imageUrl}></img>
    </ul>
  )
}

export default ShouldersProgressItem;