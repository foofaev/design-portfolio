import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import Info from '../Typography/Info';

import { Project } from '../../types';

import styles from './styles';

type Props = {
  project: Project,
};

const useStyles = makeStyles(styles);

function ProjectCard({ project }: Props) {
  const classes = useStyles();

  return (
    <Card plain>
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
        <Info>
          {project.title.toUpperCase()}
        </Info>
        <div className={classes.cardDescription}>
          {project.description}
          AAAAAA
        </div>
      </CardBody>
    </Card>
  );
}


export default ProjectCard;
