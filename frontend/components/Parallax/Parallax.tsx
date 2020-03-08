import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import pickBy from 'lodash/pickBy';

import styles from './style';

const useStyles = makeStyles(styles);

type ParallaxProps = {
  filter?: boolean;
  children?: React.ReactNode | React.ReactNodeArray;
  image?: string;
  small?: boolean;
  project?: React.ReactNode;
};


function Parallax({ filter, children, image, small, project }: ParallaxProps) {
  const windowScrollTop = window.innerWidth >= 768 ? (window.pageYOffset / 3) : 0;

  const [transform, setTransform] = React.useState(`translate3d(0,${windowScrollTop}px,0)`);

  const resetTransform = () => {
    const windowScrollTopOnReset = window.pageYOffset / 3;
    setTransform(`translate3d(0,${windowScrollTopOnReset}px,0)`);
  };

  const removeResetTransform = () => {
    if (window.innerWidth >= 768) {
      window.removeEventListener('scroll', resetTransform);
    }
  };

  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
    return removeResetTransform;
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
      style={pickBy({
        // width: '105%',
        // left: '-3%',
        backgroundImage: image ? `url(${image})` : 'linear-gradient(#233666, #1B2A4E)',
        transform,
        // borderBottomLeftRadius: '20% 3%',
        // borderBottomRightRadius: '20% 3%',
      })}
    >
      {children}
    </div>
  );
}

export default Parallax;
