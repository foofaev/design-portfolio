/* ****************************************************************************************************************** */

import React from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';

import LoginForm from './LoginForm';

import { State } from '../../types';
import * as actions from '../../actions/session';

import styles from './styles';

// TODO: take from static
import backgroundImage from '../../../assets/img/login.jpg';

/* ****************************************************************************************************************** */
type StateProps = Pick<State, 'isLoggedIn' | 'loggingInState'>;
type DispatchProps = {
  login: typeof actions.login;
};

/* ****************************************************************************************************************** */
const mapStateToProps = ({ isLoggedIn, loggingInState }: State) => ({
  isLoggedIn,
  loggingInState,
});

const connector = connect<StateProps, DispatchProps, unknown, State>(
  mapStateToProps,
  { login: actions.login },
);

/* ****************************************************************************************************************** */
export type LoginProps = StateProps & DispatchProps;

const useStyles = makeStyles(styles);

function LoginPage({ isLoggedIn, loggingInState, login }: LoginProps) {
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
          backgroundImage: `url(${backgroundImage as string})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <LoginForm form="loginForm" onSubmit={login} loggingInState={loggingInState} />
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
export default connector(LoginPage);

/* ****************************************************************************************************************** */
