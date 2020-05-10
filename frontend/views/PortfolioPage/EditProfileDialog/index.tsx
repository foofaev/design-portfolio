import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import CardFooter from '../../../components/Card/CardFooter';
import CardIcon from '../../../components/Card/CardIcon';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import { EmailField, PasswordField, CustomInput } from '../../../components/inputs';

import { State, RequestStatus, AsyncActionFunction, UserOutput, UserInput } from '../../../types';

import styles from './styles';

import * as userActions from '../../../actions/user';

/* ****************************************************************************************************************** */
type StateProps = Pick<State, 'userUpdatingState' | 'userImageSavingState' | 'userImageRemovingState'>;

// TODO: change AsyncActionFunction to ThunkActionResult, because connector casts types??
type DispatchProps = {
  updateUser: typeof userActions.updateUser;
  saveUserImage: (input: { file: Blob }) => void;
  removeUserImage: (input: void) => void;
};
type OwnProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
} & InjectedFormProps<{ user: UserInput }>;

/* ****************************************************************************************************************** */
const mapStateToProps = ({ userUpdatingState, userImageSavingState, userImageRemovingState }: State): StateProps => ({
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState,
});

/* ****************************************************************************************************************** */
const actionCreators = {
  updateUser: userActions.updateUser,
  saveUserImage: userActions.saveUserImage,
  removeUserImage: userActions.removeUserImage,
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
  handleSubmit,
}: EditProfileProps) {
  const classes = useStyles();
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (): void => {
    setOpen(true);
  };

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
          <Button autoFocus color="inherit" onClick={handleClose}>
            Сохранить изменения
          </Button>
        </Toolbar>
      </AppBar>
      <GridContainer spacing={2}>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <form onSubmit={handleSubmit(updateUser)}>
              <CardHeader color="warning" className={classes.cardHeader} icon>
                <CardIcon color="warning">
                  <PersonOutlineOutlinedIcon />
                </CardIcon>
                <p>Редактировать профиль</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Company (disabled)"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <EmailField />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>About me</InputLabel>
                    <CustomInput
                      labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </Dialog>
  );
}

/* ****************************************************************************************************************** */
const ConnectedDialog = connector(EditProfileDialog);

/* ****************************************************************************************************************** */
export default reduxForm<UserInput, OwnProps>({
  form: 'editProfileForm',
})(ConnectedDialog);

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
