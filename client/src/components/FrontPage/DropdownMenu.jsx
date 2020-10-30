import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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

function DropdownMenu(props) {
  const classes = useStyles();
  const [dropdown, setDropdown] = useState({
    workout: ''
  });

   /* Handle Dropdown Filter */
   const workouts = [
    'Shoulders',
    'Planks',
    'Pending'
    ];

  const handleDropdown = (e) => {
    setDropdown({
      workout: e.target.value
    })
    props.filter(dropdown.workout);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="workout-selection">Workout</InputLabel>
        <Select
          labelId="workout-label"
          id="workout-select"
          value={dropdown.workout}
          onChange={handleDropdown}
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