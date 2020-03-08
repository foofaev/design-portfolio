import * as React from 'react';
import cn from 'classnames';
import size from 'lodash/size';
import chunk from 'lodash/chunk';

import { makeStyles } from '@material-ui/core/styles';
import GestureIcon from '@material-ui/icons/Gesture';
import BuildIcon from '@material-ui/icons/Build';
import CreateIcon from '@material-ui/icons/Create';

import GridContainer from '../../../Grid/GridContainer';
import GridItem from '../../../Grid/GridItem';
import Quote from '../../../Typography/Quote';
import Info from '../../../Typography/Info';
import InfoArea from '../../../InfoArea/InfoArea';

import Card from '../../../Card/Card';
import CardHeader from '../../../Card/CardHeader';
import CardBody from '../../../Card/CardBody';

import routes from '../../../../actions/routes';

import { Project } from '../../../../types';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  project: Project;
};

const SectionText: React.FC<Props> = ({ project }: Props) => {
  const classes = useStyles();
  const imgClasses = cn(classes.imgRaised, classes.imgRounded, classes.imgFluid, classes.imageMargin);

  const { images, description, preview, rooms, tenants, square, draftUrl } = project;

  const Features = () => (
    <GridContainer>
      <GridItem md={4} sm={4}>
        <InfoArea
          title="Площадь"
          description={<p>{square > 0 ? square : '150 м2'}</p>}
          icon={GestureIcon}
          iconColor="rose"
        />
      </GridItem>
      <GridItem md={4} sm={4}>
        <InfoArea
          title="Кол-во человек"
          description={<p>{tenants > 0 ? tenants : 10}</p>}
          icon={BuildIcon}
          iconColor="rose"
        />
      </GridItem>
      <GridItem md={4} sm={4}>
        <InfoArea
          title="Кол-во комнат"
          description={<p>{rooms > 0 ? rooms : 10}</p>}
          icon={CreateIcon}
          iconColor="rose"
        />
      </GridItem>
    </GridContainer>
  );

  const imagesBy3Columns = chunk<string>(images, Math.ceil(size(images) / 3));

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
            suscipit elit. Duis convallis nisl non lacus suscipit, eget sodales eros rhoncus. Sed eu fringilla nisi, non
            faucibus quam. Fusce quis ligula scelerisque, commodo purus sed, viverra magna. Donec sit amet urna ac
            tortor mollis ornare. Suspendisse eleifend justo vitae mollis pellentesque. Aenean ullamcorper posuere
            ipsum, et finibus neque porta quis. Duis sed aliquet nulla. Pellentesque mollis erat eu fringilla rutrum.
          </p>
        </GridItem>
        <GridItem xs={12} sm={8} md={8}>
          <Card plain blog className={classes.card}>
            <CardBody plain>
              <Features />
            </CardBody>
            <CardHeader image plain>
              <img src={require('../../../../../assets/draft.png')} alt="..." />
              <div
                className={classes.coloredShadow}
                style={{ backgroundImage: `url(${require('../../../../../assets/draft.png')})`, opacity: '1' }}
              />
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={8} md={8}>
          <p>
            {description}
            Sed euismod dui leo, id facilisis lorem elementum vel. Sed quis libero magna. Quisque ultrices nunc quam,
            vitae scelerisque ligula gravida at. Nam eget orci suscipit, placerat lacus quis, ultrices augue. Vivamus
            convallis risus felis, id congue felis interdum tristique. Nullam quis mauris laoreet, molestie leo sit
            amet, eleifend lacus. Nunc pulvinar dapibus neque, vel pellentesque justo venenatis vitae. Quisque
            vestibulum cursus luctus. Donec quam leo, pharetra id tortor in, finibus rhoncus purus. Nulla convallis,
            ante in suscipit semper, risus purus congue lacus, non interdum felis dui ut felis. Nunc tortor nibh,
            aliquam sit amet nulla nec, efficitur condimentum arcu.
          </p>
          <br />
        </GridItem>
        <GridContainer justify="center" className={classes.container}>
          {size(images) > 0 && imagesBy3Columns.map((column) => (
            <GridItem key={column[0]} xs={12} sm={4} md={4} lg={4}>
              {column.map((imageUrl) => (
                <img
                  className={imgClasses}
                  src={imageUrl}
                  alt="..."
                />
              ))}
            </GridItem>
          ))}
        </GridContainer>
      </GridContainer>
    </div>
  );
};

export default SectionText;
