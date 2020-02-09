import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '../../../Grid/GridContainer';
import GridItem from '../../../Grid/GridItem';

import styles from './styles';

type Props = {
  avatar: string,
};

const useStyles = makeStyles(styles);

const Avatar = ({ avatar }: Props) => {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <div className={classes.profile}>
          <div>
            <img src={avatar} alt="..." className={classes.image} />
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
};

export default Avatar;
