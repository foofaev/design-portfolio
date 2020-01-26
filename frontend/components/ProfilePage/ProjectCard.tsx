import * as React from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import Button from '@material-ui/core/Button';

import { Project } from '../../types';

import styles from './cardsStyle';

type Props = {
  project: Project,
};

const useStyles = makeStyles(styles);

const ProjectCard: React.FC<Props> = ({ project }) => {
  const classes = useStyles();
  const cardClasses = cn({
    [classes.card]: true,
    [classes.cardRaised]: true,
    [classes.cardBackground]: true,
  });
  const cardBodyClasses = cn({
    [classes.cardBody]: true,
    [classes.cardBodyBackground]: true,
  });

  return (
    <div className={cardClasses} style={{ backgroundImage: project.imageUrl }}>
      <div className={cardBodyClasses}>
        <a href="/url/some">
          <h3 className={classes.cardTitle}>
            {project.title}
          </h3>
        </a>
        <p className={classes.category}>
          {project.description}
        </p>
        <Button href="#" variant="outlined" color="secondary">
          <FormatAlignLeft className={classes.icons} />
          Читать подробнее
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
