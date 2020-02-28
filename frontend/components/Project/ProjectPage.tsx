import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Parallax from '../Parallax/Parallax';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

import ProjectContent from './Sections/ProjectContent/ProjectContent';

import * as actions from '../../actions/project';
import { State } from '../../types';

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

function ProjectPage({ project, /* projectShowingState, */ showProject }: Props) {
  const { pathname } = useLocation();
  const { urlKey } = useParams();

  React.useEffect(() => {
    if (urlKey && !project) showProject({ urlKey });
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const classes = useStyles();
  return (
    <div>
      <Parallax image={project.imageUrl} filter>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={classes.textCenter}>
              <h1 className={classes.title}>
                How We Built the Most Successful Castle Ever
              </h1>
              <h4 className={classes.subtitle}>
                The last 48 hours of my life were total madness. This is what I
                did.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classes.main}>
        <div className={classes.container}>
          <ProjectContent project={project} />
        </div>
      </div>
    </div>
  );
}

export default connector(ProjectPage);
