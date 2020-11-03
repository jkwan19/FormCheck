import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function UploadButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        accept="image/png, image/jpeg"
        onChange={props.uploadImage}
      />
      <div>
        <label htmlFor="contained-button-file">
          <Button
          variant="contained"
          color="default"
          component="span"
          className={classes.button}
          startIcon={<CloudUploadIcon />}
        >
          Upload
          </Button>
        </label>
        {props.image ? props.image.name : ''}
      </div>
      <Button
        type="submit"
        onClick={props.upload}
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </div>
  );
}

export default UploadButtons;