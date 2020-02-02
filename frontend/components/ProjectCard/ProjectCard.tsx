import * as React from 'react';
import cn from 'classnames';

import { makeStyles, Theme } from '@material-ui/core/styles';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Project } from '../../types';

import styles from './styles';

type Props = {
  project: Project,
};

const useStyles = makeStyles(styles);

function ProjectCard({ project }: Props) {
  const classes = useStyles();
  const cardClasses = cn(
    classes.card,
    classes.cardRaised,
    classes.cardBackground,
  );
  const cardBodyClasses = cn(
    classes.cardBody,
    classes.cardBodyBackground,
  );

  return (
    <div className={cardClasses} style={{ backgroundImage: `url(${project.images[0]})` }}>
      <div className={cardBodyClasses}>
        <a href="/url/some">
          <h3 className={classes.cardTitle}>
            {project.title}
          </h3>
        </a>
        <p className={classes.category}>
          {project.description}
          Don{"'"}t be scared of the truth because we need to restart the
          human foundation in truth And I love you like Kanye loves Kanye
          I love Rick Owens’ bed design but the back is...
        </p>
        <Button href="#" variant="outlined" color="default">
          <FormatAlignLeft className={classes.icons} />
          Читать подробнее
        </Button>
      </div>
    </div>
  );
}

          // <Card plain blog>
          //   <CardHeader plain image>
          //     <a href="#pablo">
          //       <img src={project.images[0]} alt="..." />
          //     </a>
          //     <div
          //       className={classes.coloredShadow}
          //       style={{
          //         backgroundImage: `url(${project.images[0]})`,
          //         opacity: 1,
          //       }}
          //     />
          //   </CardHeader>
          //   <CardBody plain>
          //     <h6>{project.type}</h6>
          //     <h4 className={classes.cardTitle}>
          //       <a href="#pablo">
          //         Autodesk looks to future of 3D printing with Project
          //         Escher
          //       </a>
          //     </h4>
          //     <p className={classes.description}>
          //       Like so many organizations these days, Autodesk is a
          //       company in transition. It was until recently a traditional
          //       boxed software company selling licenses.
          //       <a href="#pablo"> Read More </a>
          //     </p>
          //   </CardBody>
          // </Card>

export default ProjectCard;
