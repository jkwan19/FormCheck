import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const workouts = [
  'Shoulders',
  'Planks',
  'Pending'
]
function DropdownMenu(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="">Workout</InputLabel>
        <Select
          labelId="workout-label"
          id="workout-select"
          value={props.selections}
          onChange={props.handleDropdown}
        >
        {workouts.map((workout) => (
          <MenuItem key={workout} value={workout}>
            {workout}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
}


export default DropdownMenu;