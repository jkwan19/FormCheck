import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled('div')``;
function ProgressForm (props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileChangedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const uploadHandler = () => {
    const formData = new FormData()
    formData.append(
      'myFile',
      selectedFile,
      selectedFile.name
    )
    axios.post('my-domain.com/file-upload', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
      }
    })
  }
  return (
    <Wrapper>
      <input type="file" onChange={fileChangedHandler}/>
      <button onClick={uploadHandler}>Upload!</button>
    </Wrapper>
    )
}

export default ProgressForm;