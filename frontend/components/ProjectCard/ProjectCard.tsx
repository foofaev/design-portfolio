import * as React from 'react';
import cn from 'classnames';
import chunk from 'lodash/chunk';

import { makeStyles, Theme } from '@material-ui/core/styles';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';

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
        <h4 className={classes.cardTitle}>
          {project.title}
        </h4>
      </CardBody>
    </Card>
  );
}


export default ProjectCard;
