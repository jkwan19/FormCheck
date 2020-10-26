import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Greeting from './components/Greeting.jsx';
import Shoulders from './components/Workout/Shoulders.jsx';
import Planks from './components/Workout/Planks.jsx';
import Sleeping from './components/Workout/Sleeping.jsx';
import ShouldersProgress from './components/Progress/Shoulders.jsx';
import PlanksProgress from './components/Progress/Planks.jsx';
import ProgressForm from './components/Form/ProgressForm.jsx';
import styled, { createGlobalStyle } from 'styled-components';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Menu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [ workouts, setWorkout ] = useState('');
  const [ value, setValue ] = useState('');
  const [ progress, setProgress ] = useState([]);
  const [ isWorkoutOpen, setWorkoutOpen ] = useState(false);
  const [ isProgressOpen, setProgressOpen ] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // /* Select Progress List */
  // const handleSelect = (e) => {
  //   setValue(e.currentTarget.textContent);
  //   setWorkout('');
  //   setProgressOpen(false);
  // }

  /* Handle Workout Routine */
  const handleClick = (e) => {
    console.log(e.currentTarget.textContent)
    setWorkout(e.currentTarget.textContent);
    // setValue('');
    // setWorkoutOpen(false);
  }

  // const openWorkout = () => {
  //   setWorkoutOpen(!isWorkoutOpen);
  //   setProgressOpen(false);
  // };

  // const openProgress = () => {
  //   setProgressOpen(!isProgressOpen);
  //   setWorkoutOpen(false);
  // };


  /* Get list of progress */
  const getProgressList = () => {
    axios.get('/progress')
      .then(res => {
        setProgress([res.data]);
      })
      .catch(err => console.log('err', err));
  }

  /* Add to progress tracker */
  const addToProgressList = (data) => {
    axios.post('/progress', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  /* Menu Icons */
  const renderIcon = (icon) => {
    if (icon === 'Home') return <HomeIcon/>;
    if (icon === 'Shoulders' || icon === 'Planks') return <FitnessCenterIcon/>;
    if (icon === 'Progress') return <PhotoLibraryIcon/>;
  }
  /* Render View */

  const renderView = () => {
    if (workouts === "Shoulders") {
      return <Shoulders />
    } else if (workouts === "Planks") {
      return <Planks />
    // } else if (workouts === "Sleeping") {
    //   return <Sleeping />
    // } else if (value === "Shoulder Press") {
    //   return <ShouldersProgress progress={progress}/>
    // } else if (value === "Planks") {
    //   return <PlanksProgress progress={progress}/>
    } else if (workouts === "Progress") {
      return <ProgressForm handleForm={addToProgressList}/>
    } else {
      return (
        <div>
          <Greeting />
        </div>
      )
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            FormCheck
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Shoulders', 'Planks', 'Progress'].map((text) => (
            <ListItem onClick={handleClick} button key={text}>
              <ListItemIcon>{renderIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderView()}
      </main>
    </div>
  );
}

export default Menu;