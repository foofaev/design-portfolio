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
  saveUserImage: (input: { file: Blob }) => void;
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
function EditProfileDialog({
  open,
  setOpen,
  updateUser,
  saveUserImage,
  removeUserImage,
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState,
  user,
  changePassword,
}: EditProfileProps) {
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
          <AvatarForm form="changeAvatarForm" onSubmit={saveUserImage} />
          <ChangePasswordForm form="changePasswordForm" onSubmit={changePassword} />
        </GridItem>
      </GridContainer>
    </Dialog>
  );
}

/* ****************************************************************************************************************** */
export default connector(EditProfileDialog);

/* ****************************************************************************************************************** */
// export default reduxForm<UserInput, OwnProps>({
//   form: 'editProfileForm',
//   enableReinitialize: true,
// })(ConnectedDialog);

/* ****************************************************************************************************************** */
// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// // core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
// import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";

// import avatar from "assets/img/faces/marc.jpg";

// const styles = {
//   cardCategoryWhite: {
//     color: "rgba(255,255,255,.62)",
//     margin: "0",
//     fontSize: "14px",
//     marginTop: "0",
//     marginBottom: "0"
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   }
// };

// const useStyles = makeStyles(styles);

// export default function UserProfile() {
//   const classes = useStyles();
//   return (
//     <div>
//       <GridContainer>
//         <GridItem xs={12} sm={12} md={8}>
//           <Card>
//             <CardHeader color="primary">
//               <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
//               <p className={classes.cardCategoryWhite}>Complete your profile</p>
//             </CardHeader>
//             <CardBody>
//               <GridContainer>
//                 <GridItem xs={12} sm={12} md={5}>
//                   <CustomInput
//                     labelText="Company (disabled)"
//                     id="company-disabled"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                     inputProps={{
//                       disabled: true
//                     }}
//                   />
//                 </GridItem>
//                 <GridItem xs={12} sm={12} md={3}>
//                   <CustomInput
//                     labelText="Username"
//                     id="username"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//                 <GridItem xs={12} sm={12} md={4}>
//                   <CustomInput
//                     labelText="Email address"
//                     id="email-address"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//               </GridContainer>
//               <GridContainer>
//                 <GridItem xs={12} sm={12} md={6}>
//                   <CustomInput
//                     labelText="First Name"
//                     id="first-name"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//                 <GridItem xs={12} sm={12} md={6}>
//                   <CustomInput
//                     labelText="Last Name"
//                     id="last-name"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//               </GridContainer>
//               <GridContainer>
//                 <GridItem xs={12} sm={12} md={4}>
//                   <CustomInput
//                     labelText="City"
//                     id="city"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//                 <GridItem xs={12} sm={12} md={4}>
//                   <CustomInput
//                     labelText="Country"
//                     id="country"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//                 <GridItem xs={12} sm={12} md={4}>
//                   <CustomInput
//                     labelText="Postal Code"
//                     id="postal-code"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                   />
//                 </GridItem>
//               </GridContainer>
//               <GridContainer>
//                 <GridItem xs={12} sm={12} md={12}>
//                   <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
//                   <CustomInput
//                     labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
//                     id="about-me"
//                     formControlProps={{
//                       fullWidth: true
//                     }}
//                     inputProps={{
//                       multiline: true,
//                       rows: 5
//                     }}
//                   />
//                 </GridItem>
//               </GridContainer>
//             </CardBody>
//             <CardFooter>
//               <Button color="primary">Update Profile</Button>
//             </CardFooter>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card profile>
//             <CardAvatar profile>
//               <a href="#pablo" onClick={e => e.preventDefault()}>
//                 <img src={avatar} alt="..." />
//               </a>
//             </CardAvatar>
//             <CardBody profile>
//               <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
//               <h4 className={classes.cardTitle}>Alec Thompson</h4>
//               <p className={classes.description}>
//                 Don{"'"}t be scared of the truth because we need to restart the
//                 human foundation in truth And I love you like Kanye loves Kanye
//                 I love Rick Owens’ bed design but the back is...
//               </p>
//               <Button color="primary" round>
//                 Follow
//               </Button>
//             </CardBody>
//           </Card>
//         </GridItem>
//       </GridContainer>
//     </div>
//   );
// }
