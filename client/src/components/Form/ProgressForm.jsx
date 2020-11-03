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
  const [title, setTitle] = useState('Shoulders');
  const [imageUrl, setImageUrl] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const imageHandler = (e) => {
    console.log(e.target.files, 'test file upload')
    setImageUrl(e.target.files[0]);
    console.log(imageUrl, 'image')
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    let formData = {
      workout: title,
      imageUrl: imageUrl
    }
    props.handleForm(formData);
    setTitle('Shoulders');
    setImageUrl('');
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <Form method="post" enctype="multipart/form-data" action="/upload">
        Workout:
        <Dropdown onChange={titleHandler}>
          <Options value="Shoulders">Shoulders</Options>
          <Options value="Planks">Planks</Options>
        </Dropdown>
        Upload Image
        <UploadButtons upload={uploadHandler} uploadImage={imageHandler} image={imageUrl}/>
      </Form>
    </Wrapper>
  );
}

export default ProgressForm;
