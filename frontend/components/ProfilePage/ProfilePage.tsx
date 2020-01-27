import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import cn from 'classnames';

import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';

import { makeStyles } from '@material-ui/core/styles';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Header from '../Header/Header';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Parallax from '../Parallax/Parallax';
import ProjectCard from './ProjectCard';

import styles from './style';

import * as actions from '../../actions/projects';
import { State } from '../../types';


const useStyles = makeStyles(styles);

const mapStateToProps = ({ projects: { byId, allIds, count }, projectFetchingState }: State) => ({
  projects: allIds.map((id) => byId[id]),
  projectsCount: count,
  projectFetchingState,
});

const actionCreators = {
  addProject: actions.addProject,
  fetchProjects: actions.fetchProjects,
};

const connector = connect(
  mapStateToProps,
  actionCreators,
);

type Props = ConnectedProps<typeof connector>;

const ProfilePage: React.FC<Props> = ({ fetchProjects, projects }) => {
  // classes
  React.useEffect(() => {
    fetchProjects({ offset: 0, limit: 20 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  // const imageClasses = cn(
  //   classes.imgRaised,
  //   classes.imgRoundedCircle,
  //   classes.imgFluid,
  // );
  const flexContainerClasses = cn(classes.flexContainer);
  // const navImageClasses = cn(classes.imgRounded, classes.imgGallery);
  const pillsClasses = cn(classes.pills);

  const projectTypes = uniq(map(projects, 'type'));
  const byType = groupBy(projects, 'type');
  console.log(projectTypes);
  console.log(byType);

  const [activeButton, setActiveButton] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveButton(newValue);
  };
  const handleChangeIndexInSwipeViews = (newValue: number) => {
    setActiveButton(newValue);
  };
  const pills = !isEmpty(projectTypes) && (
    <Tabs
      classes={{
        root: classes.root,
        fixed: classes.fixed,
        flexContainer: flexContainerClasses,
        indicator: classes.displayNone,
      }}
      value={activeButton}
      onChange={handleChange}
      centered
    >
      {projectTypes.map((projectType) => (
        <Tab
          label={projectType}
          key={projectType}
          classes={{
            root: pillsClasses,
          }}
        />
      ))}
    </Tabs>
  );

  const cards = !isEmpty(byType) && (
    <GridContainer justify="center">
      {projects.map((project) => (
        <GridItem key={project.id} xs={12} sm={6} md={6}>
          <ProjectCard project={project} />
        </GridItem>
      ))}
    </GridContainer>
  );

  return (
    <div>
      <Header
        color="transparent"
        brand="foofaev-team"
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'white',
        }}
      />
      <Parallax small filter imageUrl={get(projects, '0.imageUrl', '')}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={cn(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter,
              )}
            >
              <h1 className={classes.title}>About Us</h1>
              <h4>
                Мы прекрасны
              </h4>
              {pills}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={cn(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            {cards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(ProfilePage);
