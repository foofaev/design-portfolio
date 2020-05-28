import * as React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardBody from '../../../components/Card/CardBody';
import Info from '../../../components/Typography/Info';

import { Project } from '../../../types';

import styles from './styles';

type Props = {
  project: Project;
};

const useStyles = makeStyles(styles);

const ProjectCard: React.FC<Props> = ({ project }: Props) => {
  const classes = useStyles();

  return (
    <Card plain>
      <CardHeader plain image className={classes.imgCardExtended}>
        <Link to={`/projects/${project.urlKey}`}>
          <img src={project.imageUrl} alt="..." />
        </Link>
        <div
          className={classes.coloredShadow}
          style={{
            backgroundImage: `url(${project.imageUrl})`,
            opacity: 1,
          }}
        />
      </CardHeader>
      <CardBody plain>
        <Info>
          {project.title.toUpperCase()}
        </Info>
        <div className={classes.cardDescription}>
          {project.preview}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
