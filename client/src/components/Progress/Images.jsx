import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    float: 'left',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 600,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

const toDate = (date) => {
  return moment(date).calendar();
}

function Images(props) {
  const classes = useStyles();
  const progressList = props.progress;
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {progressList.map((tile, index) => (
          <GridListTile key={`${tile.imageUrl}${index}`} cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1}>
            <img src={tile.imageUrl} alt={tile.workout} />
            <GridListTileBar
              title={tile.workout}
              subtitle={toDate(tile.createdAt)}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${tile.workout}`} className={classes.icon}>
                  {/* <StarBorderIcon /> */}
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default Images;