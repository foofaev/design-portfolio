import React, { useState } from 'react';
import cn from 'classnames';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import { AutoRotatingCarousel, ImageSlide } from '../../../components/Carousel';

import modulo from '../../../helpers';
import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  imageUrls: string[];
  currentImage: string;
};

function Photos({ imageUrls, currentImage }: Props) {
  const classes = useStyles();
  const imgClasses = cn(classes.imgRaised, classes.imgRounded, classes.imgFluid, classes.imageMargin);

  const [isOpen, setHandleOpen] = useState(false);
  const handleClick = (): void => setHandleOpen(true);
  const currentIndex = modulo(imageUrls.indexOf(currentImage), imageUrls.length);

  const isLandscape = useMediaQuery('(orientation:landscape)');
  const isMobile = useMediaQuery(`(${isLandscape ? 'max-height' : 'max-width'}:600px)`);

  if (imageUrls.length === 0 || imageUrls.indexOf(currentImage) === -1) return <div />;

  return (
    <>
      <div role="button" aria-label="Open image" tabIndex={0} onKeyPress={handleClick} onClick={handleClick}>
        <img alt="" className={imgClasses} src={currentImage} />
      </div>
      <div>
        <AutoRotatingCarousel
          open={isOpen}
          currentIndex={currentIndex}
          onClose={(): void => setHandleOpen(false)}
          onStart={(): void => setHandleOpen(false)}
          autoplay={false}
          mobile={isMobile}
          landscape={isLandscape}
          style={{ position: 'absolute' }}
          large
          hideFooter={isMobile}
        >
          {imageUrls.map((url) => <ImageSlide key={url} mobile={isMobile} landscape={isLandscape} image={url} />)}
        </AutoRotatingCarousel>
      </div>
    </>
  );
}

export default Photos;
