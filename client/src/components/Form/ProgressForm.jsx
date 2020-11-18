import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import UploadButtons from './Button.jsx';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Notable');
  body {
    font-family: 'Notable', sans-serif;
  }`;

const Wrapper = styled('div')``;
const Form = styled('form')``;

const Input = styled('input')`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
const Options = styled('option')``;
const Dropdown = styled('select')`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

function ProgressForm(props) {
  const [workout, setWorkout] = useState('Shoulders');
  const [image, setImage] = useState('')

  const workoutHandler = (e) => {
    setWorkout(e.target.value);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    let data = {
      workout,
      image: formData
    }
    props.handleForm(data);
    setWorkout('Shoulders');
    setImage('');
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <Form method="post" enctype="application/x-www-form-urlencoded" action="./public/uploads">
        Workout:
        <Dropdown onChange={workoutHandler}>
          <Options value="Shoulders">Shoulders</Options>
          <Options value="Planks">Planks</Options>
        </Dropdown>
        Upload Image
        <UploadButtons upload={uploadHandler} uploadImage={imageHandler} image={image}/>
      </Form>
    </Wrapper>
  );
}

export default ProgressForm;
