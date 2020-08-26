import React, { useState, useEffect } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import axios from 'axios';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Notable');
  body {
    font-family: 'Notable', sans-serif;
  }`

const Wrapper = styled('div')``;
const Form = styled('form')``;
const Button = styled('button')`
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
    color: white;
  }
`;
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

function ProgressForm (props) {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('Shoulders');
  const [imageUrl, setImageUrl] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value);
  }

  const imageHandler = (e) => {
    setImageUrl(e.target.value);
  }

  const uploadHandler = (e) => {
    e.preventDefault();
    let formData = {
      workout: title,
      imageUrl: imageUrl
    }
    props.handleForm(formData);
    setTitle('Shoulders');
    setImageUrl('');
  }

  return (
    <Wrapper>
      <GlobalStyles />
      <Form onSubmit={uploadHandler}>
        Workout:
        <Dropdown onChange={titleHandler}>
          <Options value="Shoulders">Shoulders</Options>
          <Options value="Planks">Planks</Options>
        </Dropdown>
        Image: <Input type="text" onChange={imageHandler} placeholder="Link..."/>
        <Button type="submit">Upload!</Button>
      </Form>
    </Wrapper>
    )
}

export default ProgressForm;