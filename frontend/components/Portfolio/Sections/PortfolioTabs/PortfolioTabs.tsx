import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import chunk from 'lodash/chunk';
import get from 'lodash/get';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';

import GridContainer from '../../../Grid/GridContainer';
import GridItem from '../../../Grid/GridItem';

import { Project } from '../../../../types';

import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './styles';

type Props = {
  projects: Project[];
};

const projectTypesMap = {
  render: 'визуализация',
};

const defaultType = 'проект';

const useStyles = makeStyles(styles);

const NUMBER_OF_COLUMNS = 2;

const PortfolioTabs: React.FC<Props> = ({ projects }: Props) => {
  const classes = useStyles();

  const projectTypes = uniq(map(projects, 'type'));
  const byType = groupBy<Project>(projects, 'type');

  const [activeButton, setActiveButton] = React.useState(projectTypes[0]);

  const inColumns = chunk<Project>(byType[activeButton], Math.ceil(projects.length / NUMBER_OF_COLUMNS));

  const pills = (
    <Tabs
      classes={{
        root: classes.root,
        fixed: classes.fixed,
        flexContainer: classes.flexContainer,
        indicator: classes.displayNone,
      }}
      value={activeButton}
      onChange={(_, newValue) => setActiveButton(newValue)}
      centered
    >
      {projectTypes.map((projectType) => (
        <Tab
          label={projectTypesMap[projectType] || defaultType}
          key={projectType}
          value={projectType}
          classes={{
            root: classes.pills,
            wrapper: classes.tabWrapper,
            selected: classes.rose,
          }}
        />
      ))}
    </Tabs>
  );

  const cards = (
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
    <>
      {pills}
      {cards}
    </>
  );
};

export default PortfolioTabs;
