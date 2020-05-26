/* ****************************************************************************************************************** */
import React from 'react';
import { reduxForm, InjectedFormProps, FormErrors, FormSubmitHandler } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import CardFooter from '../../../components/Card/CardFooter';
import CardIcon from '../../../components/Card/CardIcon';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import PasswordField from './PasswordInput';

import styles from './styles';

/* ****************************************************************************************************************** */
type InputProps = { newPassword: string; newPasswordConfirm: string; oldPassword: string };

/* ****************************************************************************************************************** */
type Props = InjectedFormProps<InputProps>;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const validate = ({ newPassword, newPasswordConfirm }: Partial<InputProps>): FormErrors<InputProps> => {
  const errors: FormErrors<InputProps> = {};
  if (newPasswordConfirm && newPassword !== newPasswordConfirm) {
    errors.newPassword = 'Пароли не совпадают!';
    errors.newPasswordConfirm = 'Пароли не совпадают!';
  }
  return errors;
};

/* ****************************************************************************************************************** */
const ChangePasswordForm: React.FC<Props> = ({
  handleSubmit,
  submitting,
  pristine,
  reset,
}: Props) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader color="warning" className={classes.cardHeader} icon>
          <CardIcon color="warning">
            <VpnKeyIcon />
          </CardIcon>
          <p>Сменить пароль</p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <PasswordField id="oldPassword" labelText="Старый пароль" />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <PasswordField id="newPassword" labelText="Новый пароль" />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <PasswordField id="newPasswordConfirm" labelText="Повторите новый пароль" />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button type="submit" disabled={submitting || pristine} color="inherit" autoFocus>
            Изменить пароль
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

/* ****************************************************************************************************************** */
export default reduxForm<InputProps>({
  enableReinitialize: true,
  validate,
})(ChangePasswordForm);

/* ****************************************************************************************************************** */
