import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import cn from 'classnames';

import styles from './slideStyles';

const useStyles = makeStyles(styles);

export type SlideProps = {
  image: string;
  mobile?: boolean;
  landscape?: boolean;
  style?: React.CSSProperties;
};

function ImageSlide(props: SlideProps) {
  const { mobile, landscape, style, image } = props;
  const classes = useStyles();

  const mobileLandscape = mobile && landscape;

  return (
    <div
      className={cn(classes.root, {
        [classes.rootMobileLandscape]: mobileLandscape,
      })}
      style={{ ...style, backgroundColor: 'transparent' }}
    >
      <div className={cn(classes.image)}>
        <img src={image} alt="Изображение" />
      </div>
    </div>
  );
}

export default ImageSlide;
