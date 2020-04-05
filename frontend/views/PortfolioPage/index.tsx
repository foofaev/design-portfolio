/* ****************************************************************************************************************** */

import * as React from 'react';
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
import { State } from '../../types';

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const mapStateToProps = ({ projects: { byId, allIds, count }, projectFetchingState, user }: State) => ({
  projects: allIds.map((id) => byId[id]),
  projectsCount: count,
  projectFetchingState,
  user,
});

/* ****************************************************************************************************************** */
const actionCreators = {
  addProject: projectActions.addProject,
  fetchProjects: projectActions.fetchProjects,
  showUser: userActions.showUser,
  updateUser: userActions.updateUser,
};

/* ****************************************************************************************************************** */
const connector = connect(mapStateToProps, actionCreators);

/* ****************************************************************************************************************** */

/* ****************************************************************************************************************** */
type Props = ConnectedProps<typeof connector>;

/* ****************************************************************************************************************** */
const Portfolio: React.FC<Props> = ({ fetchProjects, projects, user, showUser, updateUser }: Props) => {
  React.useEffect(() => {
    fetchProjects({ offset: 0, limit: 20 });
    showUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  // TODO: load from profile
  // eslint-disable-next-line global-require
  const avatar = require('../../../assets/img/nastya.png');

  // TODO: load from static
  // eslint-disable-next-line global-require
  const background = require('../../../assets/img/bg2.jpg');

  // TODO: add skeletons

  return (
    <div>
      <Parallax image={background} filter className={classes.parallax} />
      <div className={cn(classes.main, classes.mainRaised)}>
        <About avatar={avatar} user={user} />
        <div className={cn(classes.description, classes.textCenter)}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a egestas purus, id pretium quam. Vivamus id
            suscipit elit. Sed euismod dui leo, id facilisis lorem elementum vel. Sed quis libero magna. Quisque
            ultrices nunc quam,
          </p>
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
