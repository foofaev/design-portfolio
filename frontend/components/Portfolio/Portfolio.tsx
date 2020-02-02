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
import Typography from '@material-ui/core/Typography';

import Header from '../Header/Header';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Parallax from '../Parallax/Parallax';
import ProjectCard from '../ProjectCard/ProjectCard';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';

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
            wrapper: classes.tabWrapper,
            selected: classes.rose,
          }}
        />
      ))}
    </Tabs>
  );

  const cards = !isEmpty(byType) && (
    <GridContainer direction="column" justify="center" className={classes.container}>
      {projects.map((project) => (
        <GridItem key={project.id} xs={12} sm={6} md={6} lg={4}>
          <Card blog plain>
            <CardHeader plain image>
              <a href="#pablo">
                <img src={project.images[0]} alt="..." />
              </a>
              <div
                className={classes.coloredShadow}
                style={{
                  backgroundImage: `url(${project.images[0]})`,
                  opacity: 1,
                }}
              />
            </CardHeader>
            <CardBody plain>
              <h6>{project.type}</h6>
              <h4 className={classes.cardTitle}>
                <a href="#pablo">
                  {project.title}
                </a>
              </h4>
              <p className={classes.description}>
                Like so many organizations these days, Autodesk is a
                company in transition. It was until recently a traditional
                boxed software company selling licenses.
                <a href="#pablo"> Read More </a>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </GridContainer>
  );

  return (
    <div>
      <Parallax>
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
                className="MuiTypography--heading"
                variant="h3"
                gutterBottom
              >
              Никитина Анастасия
              </Typography>
              <h1 className={classes.title}>Никитина Анастасия</h1>
              <h4>
                Никитина Анастасия
              </h4>
              {pills}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={cn(classes.mainRaised)}>
        <div className={classes.container}>
          {cards}
        </div>
      </div>
    </div>
  );
};

export default connector(ProfilePage);
