import React, { useState, useEffect } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import axios from 'axios';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Notable');
  body {
    font-family: 'Notable', sans-serif;
  }`

const Wrapper = styled('div')``;
const Input = styled('input')`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
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
      <form onSubmit={uploadHandler}>
        Workout:
        <Dropdown onChange={titleHandler}>
          <option value="Shoulders">Shoulders</option>
          <option value="Planks">Planks</option>
        </Dropdown>
        Image: <Input type="text" onChange={imageHandler} placeholder="Link..."/>
        <button type="submit">Upload!</button>
      </form>
    </Wrapper>
    )
}

export default ProgressForm;