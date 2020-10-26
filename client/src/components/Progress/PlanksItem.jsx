import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Items = styled('ul')`
  float: left;
  width: 40%;
`
const Date = styled('div')`
  float: left;
`

const Image = styled('img')`
  float: left;
`

function PlanksProgressItem (props) {
  let date = moment(props.item.createdAt).calendar();
  return (
    <Items>
      <Date>{date}</Date>
        <Image src={props.item.imageUrl}></Image>
    </Items>
  )
}

export default PlanksProgressItem;