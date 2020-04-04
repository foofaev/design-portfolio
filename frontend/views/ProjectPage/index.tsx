import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation, useParams, Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Parallax from '../../components/Parallax/Parallax';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import ProjectContent from './ProjectContent';
import SpeedDial from './SpeedDial';

import * as actions from '../../actions/project';
import { State } from '../../types';

import routes from '../../actions/routes';

import styles from './styles';

const mapStateToProps = ({ project, projectShowingState, isLoggedIn }: State) => ({
  project,
  projectShowingState,
  isLoggedIn,
});

const actionCreators = {
  showProject: actions.showProject,
  removeProject: actions.removeProject,
  updateProject: actions.updateProject,
};

const connector = connect(mapStateToProps, actionCreators);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(styles);

function ProjectPage({ project, projectShowingState, showProject, removeProject, updateProject, isLoggedIn }: Props) {
  const { pathname } = useLocation();
  const { urlKey } = useParams();
  const [speedDialHidden, setSpeedDialHidden] = React.useState(!isLoggedIn);

  React.useEffect(() => {
    if ((urlKey && isEmpty(project)) || (urlKey && project.urlKey !== urlKey)) showProject({ urlKey });
  }, [urlKey, project, showProject]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    setSpeedDialHidden(!isLoggedIn);
  }, [isLoggedIn]);

  const classes = useStyles();
  const { clientWidth, clientHeight } = document.documentElement;
  return (
    <div>
      <Header
        color="transparent"
        fixed
        brand=""
        leftLinks={(
          <Link to="/" className={classes.mainLink}>
            <Tooltip title="На главную" aria-label="на главную">
              <ArrowBackIcon fontSize="large" color="inherit" />
            </Tooltip>
          </Link>
        )}
      />
      <Parallax image={routes.parallaxImageUrl(project.imageUrl, clientWidth, clientHeight)} filter>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <Typography variant="h3" gutterBottom className={classes.title}>
                Наш новый дерзновенный проект
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <ProjectContent project={project} />
          <SpeedDial
            hidden={speedDialHidden}
            removeProject={removeProject}
            updateProject={updateProject}
            project={project}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connector(ProjectPage);
