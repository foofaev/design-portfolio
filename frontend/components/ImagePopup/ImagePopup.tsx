import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
// import useWidth from '../../useWidth';

import routes from '../../actions/routes';

import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Card from '../Card/Card';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  imageUrls: string[];
  currentIndex: number;
};

function getPopupSliderImageParams(breakpoint: Breakpoint) {
  if (breakpoint === 'xl') return { width: 1920, height: 1080 };
  if (breakpoint === 'md') return { width: 760, height: 760 };
  if (breakpoint === 'lg') return { width: 1024, height: 1024 };
  return { width: 1920, height: 1080 };
}

function ImagePopup({ imageUrls, currentIndex }: Props) {
  const classes = useStyles();
  const imgClasses = cn(classes.imgRaised, classes.imgRounded, classes.imgFluid, classes.imageMargin);

  const [open, setOpen] = React.useState(false);
  // const breakpoint = useWidth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (imageUrls.length === 0) return <div />;

  // const handlePopupSlideClick = () => {
  //   const nextSlideIndex = images[activeImageIndex + 1] ? activeImageIndex + 1 : 0;
  //   setActiveImageIndex(nextSlideIndex);
  // };
  // const handleLeftArrowClick = () => {
  //   const prevSlideIndex = images[activeImageIndex - 1] ? activeImageIndex - 1 : images.length - 1;
  //   setActiveImageIndex(prevSlideIndex);
  // };
  // const handleRightClickArrow = () => {
  //   const nextSlideIndex = images[activeImageIndex + 1] ? activeImageIndex + 1 : 0;
  //   setActiveImageIndex(nextSlideIndex);
  // };
  // const onThumbClick = (index) => {
  //   setActiveImageIndex(index);
  // };
  //
  // const { height, width } = getPopupSliderImageParams(breakpoint);
  const sliderImages = imageUrls.map((url) => routes.imageByParams(url, 1920, 1080));
  const currentImage = sliderImages[currentIndex];

  const settings = {
    // customPaging: (i: number) => <img src={sliderImages[i + 1]} alt={`carousel page ${sliderImages[i + 1]}`} />,
    dots: true,
    // dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    // initialSlide: currentIndex,
  };

  return (
    <>
      <img className={imgClasses} role="presentation" src={currentImage} alt="..." onClick={handleClickOpen} />
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="image-dialog-title" className={classes.container}>
        <DialogContent>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={8}>
              <Card>
                <Slider dots slidesToShow={1}>
                  {sliderImages.map((url) => (
                    <div key={url}>
                      <img src={url} alt="..." />
                    </div>
                  ))}
                </Slider>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ImagePopup;
