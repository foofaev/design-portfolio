import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import Button from '../CustomButtons/Button';
import { Project } from '../../types';
import styles from './cardsStyle';

type Props = {
  project: Project,
};

const useStyles = makeStyles(styles);

const ProjectCard: React.FC<Props> = ({ project }) => {
  const classes = useStyles();
  return (
    <Card
      raised
      background
      style={{ backgroundImage: project.imageUrl }}
    >
      <CardBody background>
        <a href="/url/some">
          <h3 className={classes.cardTitle}>
            {project.title}
          </h3>
        </a>
        <p className={classes.category}>
          {project.description}
        </p>
        <Button round href="#" color="danger">
          <FormatAlignLeft className={classes.icons} />
          Читать подробнее
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
