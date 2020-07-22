/* ****************************************************************************************************************** */

import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import keyBy from 'lodash/keyBy';

import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';

import { Project, ImageOutput } from '../../types';

import styles from './styles';

/* ****************************************************************************************************************** */
type ImageProps = {
  image: ImageOutput;
};

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const ProjectImage: React.FC<ImageProps> = ({ image }: ImageProps) => {
  const classes = useStyles();

  return (
    <Card plain>
      <CardHeader plain image className={classes.imgCard}>
        <img src={image.url} alt="..." />
        <div
          style={{
            backgroundImage: `url(${image.url})`,
            opacity: 1,
          }}
        />
      </CardHeader>
      <CardBody plain>{image.ord}</CardBody>
    </Card>
  );
};

// /* ****************************************************************************************************************** */
// type FormProps = InjectedFormProps<Project>;
type OwnProps = {
  projectId: string;
  images: ImageOutput[];
};

/* ****************************************************************************************************************** */
const ImagesColumn = ({ projectId, images }: OwnProps) => {
  const [imageIds, setImageIds] = React.useState(images.map(({ id }) => id));
  const byIds = keyBy(images, 'id');

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, draggingId: string): void => {
    event.dataTransfer.effectAllowed = 'move'; // eslint-disable-line no-param-reassign
    event.dataTransfer.setData('id', draggingId);
  };

  const handleDragDrop = (event: React.DragEvent<HTMLDivElement>, droppingToId: string): void => {
    const draggingId: string = event.dataTransfer.getData('id');
    const newIds = imageIds.map((id) => {
      if (id === draggingId) return droppingToId;
      if (id === droppingToId) return draggingId;
      return id;
    });
    setImageIds(newIds);
  };

  return (
    <GridContainer spacing={2} direction="column" justify="center">
      <GridItem xs={12} sm={12} md={8} lg={4}>
        {imageIds.map((imageId) => (
          <div
            key={imageId}
            draggable
            onDragOver={(ev): void => ev.preventDefault()}
            onDragStart={(ev): void => handleDragStart(ev, imageId)}
            onDrop={(ev): void => handleDragDrop(ev, imageId)}
          >
            <ProjectImage image={byIds[imageId]} />
          </div>
        ))}
      </GridItem>
    </GridContainer>
  );
};

/* ****************************************************************************************************************** */
export default ImagesColumn;

/* ****************************************************************************************************************** */
