import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShouldersProgressItem from './ShouldersItem.jsx'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

// const Wrapper = styled('div') ``;
// const List = styled("ul") `
//   text-align: center;
// `;
// function Shoulders (props) {
//   let progressList = props.progress;
//   return(
//     <Wrapper>
//       <List>
//         {
//           progressList.map(progress =>
//             <ShouldersProgressItem item={progress} />
//             )
//           }
//       </List>
//     </Wrapper>
//   )
// }
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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

// const tileData = {
//     img: image,
//     title: 'Image',
//     author: 'author',
//     featured: true,
// };

function Shoulders(props) {
  const classes = useStyles();
  const progressList = props.progress;
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {progressList.map((tile) => (
          <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.imageUrl} alt={tile.workout} />
            <GridListTileBar
              title={tile.workout}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${tile.workout}`} className={classes.icon}>
                  <StarBorderIcon />
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

export default Shoulders;