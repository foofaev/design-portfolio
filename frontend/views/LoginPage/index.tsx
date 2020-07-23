/* ****************************************************************************************************************** */

import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { useHistory, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';

import { EmailField, PasswordField } from './inputs';

import { State } from '../../types';
import * as actions from '../../actions/session';

import styles from './styles';

/* ****************************************************************************************************************** */
type StateProps = Pick<State, 'isLoggedIn' | 'loggingInState'>;

/* ****************************************************************************************************************** */
const mapStateToProps = ({ isLoggedIn, loggingInState }: State) => ({
  isLoggedIn,
  loggingInState,
});

type InputProps = { email: string; password: string };

const connector = connect<StateProps, null, InjectedFormProps<InputProps>, State>(
  mapStateToProps,
  null,
);

/* ****************************************************************************************************************** */
export type LoginProps = StateProps & InjectedFormProps<InputProps>;

// TODO: take from static
const backgroundImage = require('../../../assets/img/login.jpg') as string; // eslint-disable-line

const useStyles = makeStyles(styles);

function LoginPage(props: LoginProps) {
  const { isLoggedIn, loggingInState, handleSubmit, submitting, error } = props;
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  React.useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn, history]);

  const [alertVisible, toggleAlert] = React.useState(!!error);
  React.useEffect(() => {
    toggleAlert(!!error);
  }, [error]);

  const closeAlert = (__?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') return;
    toggleAlert(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        absolute
        brand=""
        leftLinks={(
          <Link to="/" className={classes.mainLink}>
            <Tooltip title="На главную" aria-label="на главную">
              <ArrowBackIcon fontSize="large" color="inherit" />
            </Tooltip>
          </Link>
        )}
      />
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
                    <Button type="submit" disabled={submitting || loggingInState.status === 'requested'} size="large">
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

/* ****************************************************************************************************************** */
const ConnectedLoginPage = connector(LoginPage);

/* ****************************************************************************************************************** */
export default reduxForm<InputProps>({
  form: 'loginForm',
  onSubmit: actions.login,
})(ConnectedLoginPage);

/* ****************************************************************************************************************** */
