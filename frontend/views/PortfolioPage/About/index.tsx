/* ****************************************************************************************************************** */

import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';

import styles from './styles';
import { UserOutput } from '../../../types';

/* ****************************************************************************************************************** */

type Props = {
  avatar: string;
  user: UserOutput;
};

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const About: React.FC<Props> = ({ avatar, user }: Props) => {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <div className={classes.profile}>
          <div>
            <img src={avatar} alt="..." className={classes.image} />
          </div>
          <div className={classes.name}>
            <Typography variant="h4" gutterBottom className={classes.title}>
              Никитина Анастасия
              {user.firstName}
              {user.lastName}
            </Typography>
            <h4>
              дизайнер интерьера, художник, декоратор
              {user.about}
            </h4>
            <IconButton aria-label="facebook link">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="instagram link">
              <InstagramIcon />
            </IconButton>
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
};

/* ****************************************************************************************************************** */
export default About;

/* ****************************************************************************************************************** */
