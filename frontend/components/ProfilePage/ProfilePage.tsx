import * as React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import cn from 'classnames';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
// core components
import Header from '../Header/Header';
// import Footer from 'components/Footer/Footer.js';
// import Button from 'components/CustomButtons/Button.js';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Parallax from '../Parallax/Parallax';
import ProjectCard from './ProjectCard';

import styles from './style';

import * as actions from '../../actions/projects';
import { State, Project } from '../../types';


const useStyles = makeStyles(styles);

const mapStateToProps = ({ projects: { byId, allIds, count } }: State) => ({
  projects: allIds.map((id) => byId[id]),
  projectsCount: count,
});

const mapActionsToProps = {
  addProject: actions.addProject,
  fetchProjects: actions.fetchProjects,
};

interface Props {
  projects: Project[],
  projectsCount: number,
  addProject: typeof mapActionsToProps.addProject,
  fetchProjects: typeof mapActionsToProps.fetchProjects,
}

function ProfilePage({ fetchProjects, projects, projectsCount }: Props) {
  // classes
  const classes = useStyles();
  // const imageClasses = cn(
  //   classes.imgRaised,
  //   classes.imgRoundedCircle,
  //   classes.imgFluid,
  // );
  const flexContainerClasses = cn(classes.flexContainer);
  // const navImageClasses = cn(classes.imgRounded, classes.imgGallery);
  const pillsClasses = cn(classes.pills);

  const projectTypes = map(projects, 'type');
  const byType = groupBy(projects, 'type');

  const [activeButton, setActiveButton] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveButton(newValue);
  };
  const handleChangeIndexInSwipeViews = (newValue: number) => {
    setActiveButton(newValue);
  };
  React.useEffect(() => {
    fetchProjects({ offset: 0, limit: 20 });
  });

  const pills = (
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

  const cards = (
    <GridContainer justify="center">
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis="x"
          index={activeButton}
          onChangeIndex={handleChangeIndexInSwipeViews}
        >
          {map(byType, (projectsInType, type) => (
            <div key={type}>
              {projectsInType.map((project) => (
                <GridItem key={project.id} xs={12} sm={6} md={6}>
                  <ProjectCard project={project} />
                </GridItem>
              ))}
            </div>
          ))}
        </SwipeableViews>
      </div>
    </GridContainer>
  );

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'white',
        }}
      />
      <Parallax small filter imageUrl={projects[0].imageUrl}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={cn(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>About Us</h1>
              <h4>
                Meet the amazing team behind this project and find out more
                about how we work.
              </h4>
              {tabButtons}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={cn(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            /* PROFILE IMAGE OR DESCRIPTION */
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);
