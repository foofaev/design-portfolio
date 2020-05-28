/* ****************************************************************************************************************** */

import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';

import EditUserForm from './EditUserForm';
import ChangePasswordForm from './ChangePasswordForm';
import AvatarForm from './AvatarForm';

import { State } from '../../../types';

import styles from './styles';

import * as userActions from '../../../actions/user';

/* ****************************************************************************************************************** */
type StateProps = Pick<State, 'userUpdatingState' | 'userImageSavingState' | 'userImageRemovingState' | 'user'>;

// TODO: change AsyncActionFunction to ThunkActionResult, because connector casts types??
type DispatchProps = {
  updateUser: typeof userActions.updateUser;
  changePassword: typeof userActions.changePassword;
  saveUserImage: typeof userActions.saveUserImage;
  removeUserImage: (input: void) => void;
};

type OwnProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
};

/* ****************************************************************************************************************** */
const mapStateToProps = ({
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState,
  user,
}: State): StateProps => ({
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState,
  user,
});

/* ****************************************************************************************************************** */
const actionCreators = {
  updateUser: userActions.updateUser,
  saveUserImage: userActions.saveUserImage,
  removeUserImage: userActions.removeUserImage,
  changePassword: userActions.changePassword,
};

/* ****************************************************************************************************************** */
const connector = connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, actionCreators);

/* ****************************************************************************************************************** */

export type EditProfileProps = StateProps & DispatchProps & OwnProps;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const Transition = React.forwardRef(
  (props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) => (
    // eslint-disable-next-line
    <Slide direction="up" ref={ref} {...props} />
  ),
);

/* ****************************************************************************************************************** */
const EditProfileDialog: React.FC<EditProfileProps> = ({
  open,
  setOpen,
  updateUser,
  saveUserImage,
  /* removeUserImage,
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState, */
  user,
  changePassword,
}: EditProfileProps) => {
  const classes = useStyles();

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <GridContainer spacing={2} justify="center">
        <GridItem xs={12} sm={12} md={8} lg={8}>
          <EditUserForm form="editProfileForm" initialValues={user} onSubmit={updateUser} />
        </GridItem>
        <GridItem xs={12} sm={12} md={8} lg={4}>
          <AvatarForm form="changeAvatarForm" imageUrl={user.imageUrl} onSubmit={saveUserImage} />
          <ChangePasswordForm form="changePasswordForm" onSubmit={changePassword} />
        </GridItem>
      </GridContainer>
    </Dialog>
  );
};

/* ****************************************************************************************************************** */
export default connector(EditProfileDialog);

/* ****************************************************************************************************************** */
