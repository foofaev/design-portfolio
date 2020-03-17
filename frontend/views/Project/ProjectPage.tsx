import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Parallax from '../../components/Parallax/Parallax';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import ProjectContent from './Sections/ProjectContent/ProjectContent';
import Carousel from './Sections/ProjectPhotos/ProjectPhoto';

import * as actions from '../../actions/project';
import { State } from '../../types';

import routes from '../../actions/routes';

import styles from './styles';


const mapStateToProps = ({ project, projectShowingState }: State) => ({
  project,
  projectShowingState,
});

const actionCreators = {
  showProject: actions.showProject,
};

const connector = connect(
  mapStateToProps,
  actionCreators,
);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(styles);

function ProjectPage({ project, projectShowingState, showProject }: Props) {
  const { pathname } = useLocation();
  const { urlKey } = useParams();

  React.useEffect(() => {
    if ((urlKey && isEmpty(project)) || (urlKey && project.urlKey !== urlKey)) showProject({ urlKey });
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const classes = useStyles();
  const { clientWidth, clientHeight } = document.documentElement;
  return (
    <div>
      <Parallax image={routes.parallaxImageUrl(project.imageUrl, clientWidth, clientHeight)} filter>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <Typography
                variant="h3"
                gutterBottom
                className={classes.title}
              >
                Наш новый дерзновенный проект
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <Carousel />
          <ProjectContent project={project} />
        </div>
      </div>
    </div>
  );
}

export default connector(ProjectPage);
