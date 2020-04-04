import * as React from 'react';
import size from 'lodash/size';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';

import { makeStyles } from '@material-ui/core/styles';
import GestureIcon from '@material-ui/icons/Gesture';
import BuildIcon from '@material-ui/icons/Build';
import CreateIcon from '@material-ui/icons/Create';

import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import InfoArea from '../../../components/InfoArea/InfoArea';

import ProjectPhoto from '../ProjectPhoto';

// import routes from '../../../../actions/routes';

import { Project } from '../../../types';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  project: Project;
};

const Content: React.FC<Props> = ({ project }: Props) => {
  const classes = useStyles();
  const { images = [], description, preview, rooms, tenants, square, draftUrl } = project;
  const draftImage = draftUrl || require('../../../../assets/draft.png');
  const allImages = compact([draftImage, ...images]);

  const Features = () => (
    <GridContainer>
      <GridItem xs={12} md={4} sm={4}>
        <InfoArea title={square > 0 ? `${square} м2` : '150 м2'} icon={GestureIcon} iconColor="rose" />
      </GridItem>
      <GridItem xs={12} md={4} sm={4}>
        <InfoArea title={tenants > 0 ? `${tenants} человек` : '10 человек'} icon={BuildIcon} iconColor="rose" />
      </GridItem>
      <GridItem xs={12} md={4} sm={4}>
        <InfoArea title={rooms > 0 ? `${rooms} комнат` : '10 комнат'} icon={CreateIcon} iconColor="rose" />
      </GridItem>
    </GridContainer>
  );

  const Draft = () => (
    <>
      <ProjectPhoto imageUrls={allImages} currentImage={draftImage} />
      <div
        className={classes.coloredShadow}
        style={{ backgroundImage: `url(${draftImage})`, opacity: '1' }}
      />
    </>
  );

  const imagesBy3Columns = chunk<string>(images, Math.ceil(size(images) / 3));

  const Images = () => (
    <GridContainer justify="center" className={classes.container}>
      {size(images) > 0 && imagesBy3Columns.map((column) => (
        <GridItem key={`${column[0]}-column`} xs={12} sm={4} md={4} lg={4}>
          {column.map((imageUrl) => <ProjectPhoto key={imageUrl} imageUrls={allImages} currentImage={imageUrl} />)}
        </GridItem>
      ))}
    </GridContainer>
  );

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h3 className={classes.title}>
            {project.subtitle}
            Или как мы переосмыслили неоклассицизм...
          </h3>
          <p>
            {preview}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a egestas purus, id pretium quam. Vivamus id
            suscipit elit.
          </p>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} className={classes.section}>
          <Features />
        </GridItem>
        <GridItem xs={12} sm={8} md={8}>
          <Draft />
        </GridItem>
        <GridItem xs={12} sm={8} md={8}>
          <p>
            {description}
            Sed euismod dui leo, id facilisis lorem elementum vel. Sed quis libero magna. Quisque ultrices nunc quam,
          </p>
          <br />
        </GridItem>
        <Images />
      </GridContainer>
    </div>
  );
};

export default Content;
