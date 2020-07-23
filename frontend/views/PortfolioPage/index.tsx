/* ****************************************************************************************************************** */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import Parallax from '../../components/Parallax/Parallax';
import Footer from '../../components/Footer/Footer';
import PortfolioTabs from './PortfolioTabs/PortfolioTabs';
import About from './About';

import styles from './styles';

import * as projectActions from '../../actions/projects';
import * as userActions from '../../actions/user';
import * as sessionsActions from '../../actions/session';
import { State } from '../../types';

// TODO: load from static
import backgroundImage from '../../../assets/img/bg2.jpg';

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const mapStateToProps = ({ projects: { byId, allIds, count }, projectFetchingState, user, isLoggedIn }: State) => ({
  projects: allIds.map((id) => byId[id]),
  projectsCount: count,
  projectFetchingState,
  user,
  isLoggedIn,
});

/* ****************************************************************************************************************** */
const actionCreators = {
  addProject: projectActions.addProject,
  fetchProjects: projectActions.fetchProjects,
  showUser: userActions.showUser,
  checkSession: sessionsActions.checkSession,
};

/* ****************************************************************************************************************** */
const connector = connect(mapStateToProps, actionCreators);

/* ****************************************************************************************************************** */

/* ****************************************************************************************************************** */
type Props = ConnectedProps<typeof connector>;

/* ****************************************************************************************************************** */
const Portfolio: React.FC<Props> = ({ fetchProjects, projects, user, showUser, checkSession, isLoggedIn }: Props) => {
  React.useEffect(() => {
    fetchProjects({ offset: 0, limit: 20 });
    showUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (checkSession) checkSession();
  }, [checkSession]);

  const classes = useStyles();

  // TODO: add skeletons

  return (
    <div>
      <Parallax image={backgroundImage as string} filter className={classes.parallax} />
      <div className={cn(classes.main, classes.mainRaised)}>
        {user && <About avatar={user.imageUrl} user={user} />}
        <div className={cn(classes.description, classes.textCenter)}>
          <p>{user.description}</p>
        </div>
        {projects.length !== 0 && <PortfolioTabs projects={projects} />}
      </div>
      <Footer />
    </div>
  );
};

/* ****************************************************************************************************************** */
export default connector(Portfolio);

/* ****************************************************************************************************************** */
