/* ****************************************************************************************************************** */

import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';

import EditProfileDialog from '../EditProfileDialog';

import styles from './styles';
import { UserOutput, State } from '../../../types';

import * as userActions from '../../../actions/user';
import * as sessionsActions from '../../../actions/session';

/* ****************************************************************************************************************** */
const mapStateToProps = ({ isLoggedIn, userUpdatingState, userImageSavingState, userImageRemovingState }: State) => ({
  isLoggedIn,
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState,
});

/* ****************************************************************************************************************** */
const actionCreators = {
  updateUser: userActions.updateUser,
  saveUserImage: userActions.saveUserImage,
  removeUserImage: userActions.removeUserImage,
  checkSession: sessionsActions.checkSession,
};

/* ****************************************************************************************************************** */
const connector = connect(mapStateToProps, actionCreators);

/* ****************************************************************************************************************** */

type Props = {
  avatar: string;
  user: UserOutput;
  isLoggedIn: boolean;
} & ConnectedProps<typeof connector>;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const About: React.FC<Props> = ({ avatar, user, isLoggedIn }: Props) => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <div className={classes.profile}>
          <div>
            <img src={avatar} alt="..." className={classes.image} />
          </div>
          <div className={classes.name}>
            <Typography variant="h4" gutterBottom className={classes.title}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <h4>
              {user.about}
            </h4>
            <IconButton aria-label="facebook link" href={user.facebookLink}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="instagram link" href={user.instagramLink}>
              <InstagramIcon />
            </IconButton>
          </div>
        </div>
        {isLoggedIn && (
          <div className={classes.edit}>
            <Tooltip
              id="tooltip-top"
              title="Редактировать профиль"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button color="primary" variant="contained" onClick={(): void => setModalOpen(true)} className={classes.editButton}>
                <EditIcon className={classes.editIcon} />
              </Button>
            </Tooltip>
            <EditProfileDialog open={modalOpen} setOpen={setModalOpen} />
          </div>
        )}
      </GridItem>
    </GridContainer>
  );
};

/* ****************************************************************************************************************** */
export default connector(About);

/* ****************************************************************************************************************** */
