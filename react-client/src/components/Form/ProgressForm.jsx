import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled('div')``;
function ProgressForm (props) {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
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
    setTitle('');
    setImageUrl('');
  }

  return (
    <Wrapper>
      <form onSubmit={uploadHandler}>
        Workout: <input type="text" onChange={titleHandler}/>
        Image: <input type="text" onChange={imageHandler}/>
        <button type="submit">Upload!</button>
      </form>
    </Wrapper>
    )
}

export default ProgressForm;