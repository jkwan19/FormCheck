import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled("div")`
`;
const Header = styled("h4")`
`;
const Body = styled("p")`
`;
const Workouts = () => (
  <Wrapper>
    <Header> Welcome to Form Check! </Header>
    <Body> Form Check is a great way to count your reps and executing them to perfection, while avoiding injuries.</Body>
    <Body> What would you like to do today? Please refer to the navigation bar above! </Body>
  </Wrapper>
)

export default Workouts;