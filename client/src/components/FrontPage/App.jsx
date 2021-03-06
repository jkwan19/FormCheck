import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

/* Styled Library */
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

/* Components */
import ProgressForm from '../Form/ProgressForm.jsx';
import Images from '../Progress/Images.jsx';
import Planks from '../Workout/Planks.jsx';
import Shoulders from '../Workout/Shoulders.jsx';
import Greeting from './Greeting.jsx';
// import SignIn from './SignIn.jsx';
import SearchBar from './SearchBar.jsx'

/* Styling */
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

/* App */
function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [isLoggedIn, setLogin] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [workouts, setWorkout] = useState('');
  const [progress, setProgress] = useState([]);

  /* Menu Hamburger */
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* Login Page */
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('logging in')
    setLogin(true);
  }

  /* Handle Workout Routine */
  const handleClick = (e) => {
    setWorkout(e.currentTarget.textContent);
  };

  /* Handle Dropdown Filter */
  const handleFilter = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  /* Get list of progress */
  const getProgressList = () => {
    axios.get('/progress')
      .then((res) => {
        let items = res.data.reverse();
        if (search && search !== '') {
          items = items.filter(item => item.workout === search)
        }
        setProgress(items);
      })
      .catch((err) => console.log('err', err));
  };

  useEffect (()=> {
    if(!isSearching) {
      getProgressList();
    } else {
      const results = progress.filter(data =>
        data.toLowerCase().includes(search)
      );
      setSearching(!isSearching);
      setSearch(results);
    }
  }, [search]);

  /* Add to progress tracker */
  const addToProgressList = (data) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
    axios.post('/upload-progress', data, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  /* Front Page View */
  // const renderPage = (isLoggedIn) => {
  //   if (isLoggedIn) {
  //     return (
  //       <div className={classes.root}>
  //         <CssBaseline />
  //         <AppBar
  //           position="fixed"
  //           className={clsx(classes.appBar, {
  //             [classes.appBarShift]: open,
  //           })}
  //         >
  //           <Toolbar>
  //             <IconButton
  //               color="inherit"
  //               aria-label="open drawer"
  //               onClick={handleDrawerOpen}
  //               edge="start"
  //               className={clsx(classes.menuButton, {
  //                 [classes.hide]: open,
  //               })}
  //             >
  //               <MenuIcon />
  //             </IconButton>
  //             <Typography variant="h6" noWrap>
  //               FormCheck
  //             </Typography>
  //           </Toolbar>
  //         </AppBar>
  //         <Drawer
  //           variant="permanent"
  //           className={clsx(classes.drawer, {
  //             [classes.drawerOpen]: open,
  //             [classes.drawerClose]: !open,
  //           })}
  //           classes={{
  //             paper: clsx({
  //               [classes.drawerOpen]: open,
  //               [classes.drawerClose]: !open,
  //             }),
  //           }}
  //         >
  //           <div className={classes.toolbar}>
  //             <IconButton onClick={handleDrawerClose}>
  //               {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
  //             </IconButton>
  //           </div>
  //           <Divider />
  //           <List>
  //             {['Home', 'Shoulders', 'Planks', 'Progress'].map((text) => (
  //               <ListItem onClick={handleClick} button key={text}>
  //                 <ListItemIcon>{renderIcon(text)}</ListItemIcon>
  //                 <ListItemText primary={text} />
  //               </ListItem>
  //             ))}
  //           </List>
  //           <Divider />
  //         </Drawer>
  //         <main className={classes.content}>
  //           <div className={classes.toolbar} />
  //           {renderView()}
  //         </main>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <SignIn login={handleLogin}/>
  //       </div>
  //     )
  //   }
  // }

  // }
  /* Menu Icons */
  const renderIcon = (icon) => {
    if (icon === 'Home') return <HomeIcon />;
    if (icon === 'Shoulders' || icon === 'Planks') return <FitnessCenterIcon />;
    if (icon === 'Progress') return <PhotoLibraryIcon />;
  };

  /* Render View */
  const renderView = () => {
    if (workouts === 'Shoulders') {
      return <Shoulders />;
    } if (workouts === 'Planks') {
      return <Planks />;
    } if (workouts === 'Progress') {
      return <ProgressForm
        handleForm={addToProgressList}
        />;
    }
    return (
      <div>
        <Greeting />
        <Images id='images' progress={progress} />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            FormCheck
          </Typography>
          <SearchBar id='filter' handleFilter={handleFilter} search={search}/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
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

export default App;
