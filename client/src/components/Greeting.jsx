import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled("div")`
`;
const Header = styled("h4")`
`;
const Body = styled("p")`
`;

const Greeting = () => (
  <Wrapper>
    <Typography paragraph variant="h4">
      Welcome to Form Check!
    </Typography>
    <Typography paragraph>
      Form Check is a great way to count your reps and executing them to perfection, while avoiding injuries.
    </Typography>
  </Wrapper>
)

export default Greeting;