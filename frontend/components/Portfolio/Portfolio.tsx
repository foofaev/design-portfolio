import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import cn from 'classnames';

import map from 'lodash/map';
import chunk from 'lodash/chunk';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';

import { makeStyles } from '@material-ui/core/styles';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Parallax from '../Parallax/Parallax';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './style';

import * as actions from '../../actions/projects';
import { State, Project } from '../../types';


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
  const byType = keyBy(projects, 'type');

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
      {[...projectTypes, 'aaaa'].map((projectType, index) => (
        <Tab
          label={projectType}
          key={index}
          classes={{
            root: pillsClasses,
            wrapper: classes.tabWrapper,
            selected: classes.rose,
          }}
        />
      ))}
    </Tabs>
  );

  const numberOfColumns = 2;
  const inColumns = chunk<Project>(projects, Math.ceil(projects.length / numberOfColumns));

  const cards = !isEmpty(byType) && (
    <GridContainer justify="center" className={classes.container}>
      {inColumns.map((column, index) => (
        <GridItem key={get(column, '0.imageUrl', index)} xs={12} sm={6} md={6} lg={6}>
          {column.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </GridItem>
      ))}
    </GridContainer>
  );

  return (
    <div>
      <Parallax image={require('../../../assets/img/bg2.jpg')} filter small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={6}
              sm={6}
              xs={12}
              className={cn(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter,
              )}
            >
              <Typography
                variant="h3"
                gutterBottom
                className={classes.title}
              >
                Никитина Анастасия
              </Typography>
              <h4>
                дизайнер интерьеров, художник
              </h4>
              {pills}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={cn(classes.main, classes.mainRaised)}>
        {cards}
      </div>
    </div>
  );
};

export default connector(ProfilePage);
