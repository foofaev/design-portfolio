import * as React from 'react';
import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps } from 'redux-form';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import Email from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CustomInput, { CustomInputProps } from '../../components/CustomInput/CustomInput';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';

import { State } from '../../types';
import * as actions from '../../actions/session';

import styles from './styles';

const mapStateToProps = ({ isLoggedIn, loggingInState }: State): Partial<State> => ({
  isLoggedIn,
  loggingInState,
});

const actionCreators = {
  login: actions.login,
};

const connector = connect(mapStateToProps, actionCreators);

export type LoginProps = ConnectedProps<typeof connector> & InjectedFormProps;

const backgroundImage = require('../../../assets/img/login.jpg');

const useStyles = makeStyles(styles);

type InputProps = WrappedFieldProps & CustomInputProps & { className: string };

const EmailField = ({ className, input: { value, onChange }, meta: { touched, error } }: InputProps) => (
  <CustomInput
    id="email"
    formControlProps={{
      fullWidth: true,
    }}
    inputProps={{
      placeholder: 'Email...',
      type: 'email',
      value,
      onChange,
      error: touched && !!error,
      inputProps: {
        'aria-label': touched && error,
      },
      startAdornment: (
        <InputAdornment position="start">
          <Email className={className} />
        </InputAdornment>
      ),
    }}
  />
);

const PasswordField = ({ className, input: { value, onChange }, meta: { touched, error } }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <CustomInput
      id="pass"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        placeholder: 'Пароль...',
        type: showPassword ? 'text' : 'password',
        value,
        onChange,
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon className={className} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: 'off',
      }}
    />
  );
};

function LoginPage(props: LoginProps) {
  const { isLoggedIn, loggingInState, login, handleSubmit, submitting } = props;
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  React.useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn, history]);

  const classes = useStyles();
  return (
    <div>
      <Header color="transparent" absolute brand="Material Kit PRO React" />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form} onSubmit={handleSubmit(login)}>
                  <CardHeader color="primary" signup className={classes.cardHeader}>
                    <h4 className={classes.cardTitle}>Логин</h4>
                  </CardHeader>
                  <CardBody signup>
                    <div>
                      <Field name="email" component={EmailField} className={classes.inputIconsColor} />
                    </div>
                    <div>
                      <Field name="password" component={PasswordField} className={classes.inputIconsColor} />
                    </div>
                  </CardBody>
                  <div className={cn(classes.textCenter, classes.button)}>
                    <Button
                      disabled={submitting || loggingInState === 'requested'}
                      color="secondary"
                      size="large"
                    >
                      Войти
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer className={classes.footer} />
      </div>
    </div>
  );
}

const ConnectedLoginPage = connector(LoginPage);

export default reduxForm({
  form: 'loginForm',
})(ConnectedLoginPage);
