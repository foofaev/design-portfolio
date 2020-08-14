/* ****************************************************************************************************************** */
import React from 'react';
import cn from 'classnames';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import { RequestStatus } from '../../types';

import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import { EmailField, PasswordField } from './inputs';

import styles from './styles';

/* ****************************************************************************************************************** */
type InputProps = { email: string; password: string };
type OwnProps = { loggingInState: { status: RequestStatus } };

/* ****************************************************************************************************************** */
type Props = OwnProps & InjectedFormProps<InputProps, OwnProps>;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const LoginForm: React.FC<Props> = ({
  handleSubmit,
  submitting,
  pristine,
  error,
  loggingInState,
}: Props) => {
  const classes = useStyles();

  const [alertVisible, toggleAlert] = React.useState(!!error);
  React.useEffect(() => {
    toggleAlert(!!error);
  }, [error]);

  const closeAlert = (__?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') return;
    toggleAlert(false);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <CardHeader color="primary" signup className={classes.cardHeader}>
        <h4 className={classes.cardTitle}>Логин</h4>
      </CardHeader>
      <CardBody signup>
        <div>
          <Field name="email" required component={EmailField} className={classes.inputIconsColor} />
        </div>
        <div>
          <Field name="password" required component={PasswordField} className={classes.inputIconsColor} />
        </div>
        <Snackbar open={alertVisible} autoHideDuration={6000} onClose={closeAlert}>
          <MuiAlert elevation={6} variant="filled" onClose={closeAlert} severity="error">
            {error}
          </MuiAlert>
        </Snackbar>
      </CardBody>
      <div className={cn(classes.textCenter, classes.button)}>
        <Button type="submit" disabled={submitting || pristine || loggingInState.status === 'requested'} size="large">
          Войти
        </Button>
      </div>
    </form>
  );
};

/* ****************************************************************************************************************** */
export default reduxForm<InputProps, OwnProps>({})(LoginForm);

/* ****************************************************************************************************************** */
