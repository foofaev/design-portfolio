import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './parallaxStyle';

const useStyles = makeStyles(styles);

type ParallaxProps = {
  filter?: boolean,
  children?: React.ReactChildren | React.ReactChild,
  imageUrl: string,
  small?: boolean,
};


function Parallax({ filter, children, imageUrl, small }: ParallaxProps) {
  let windowScrollTop = window.innerWidth >= 768 ? window.pageYOffset / 3 : 0;

  const [transform, setTransform] = React.useState(`translate3d(0,${windowScrollTop}px,0)`);

  const resetTransform = () => {
    windowScrollTop = window.pageYOffset / 3;
    setTransform(`translate3d(0,${windowScrollTop}px, 0`);
  };

  const setResetTransformForBigScreen = () => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
  };

  const cleanupResetTransformForBigScreen = () => {
    if (window.innerWidth >= 768) {
      window.removeEventListener('scroll', resetTransform);
    }
  };

  React.useEffect(() => {
    setResetTransformForBigScreen();
    return cleanupResetTransformForBigScreen();
  });

  const classes = useStyles();
  const parallaxClasses = cn({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
  });

  return (
    <div
      className={parallaxClasses}
      style={{
        backgroundImage: `url(${imageUrl})`,
        transform,
      }}
    >
      {children}
    </div>
  );
}

export default Parallax;
