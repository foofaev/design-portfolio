import React from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import { duration } from '@material-ui/core/styles/transitions';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Modal, { ModalProps } from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import makeStyles from '@material-ui/core/styles/makeStyles';

import cn from 'classnames';

import modulo from '../../helpers';
import Dots from '../Dots/Dots';
import SwipeableCarouselView, { CarouselChild, SwipeableCarouselViewChild } from './SwipeableCarouselView';
import styles from './carouselStyles';

const useStyles = makeStyles(styles);

export interface CarouselProps extends Omit<ModalProps, 'children'> {
  autoplay?: boolean;
  buttonProps?: ButtonProps;
  currentIndex?: number;
  containerStyle?: React.CSSProperties;
  interval?: number;
  label?: string;
  landscape?: boolean;
  mobile?: boolean;
  onStart?: (event: React.SyntheticEvent) => void;
  hideArrows?: boolean;
  children: CarouselChild[];
  large?: boolean;
  hideFooter?: boolean;
}

function AutoRotatingCarousel(props: CarouselProps) {
  const {
    currentIndex = 0,
    buttonProps,
    children,
    containerStyle,
    label,
    landscape,
    onClose,
    onStart,
    autoplay = true,
    interval = 3000,
    mobile = false,
    open = false,
    hideArrows = false,
    BackdropProps: backdropProps,
    large = false,
    hideFooter = false,
  } = props;

  const [slideIndex, setSlideIndex] = React.useState(currentIndex);

  const useLandscapeMode = mobile && landscape;
  const transitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };
  const childrenLength = React.Children.count(children);
  const hasMultipleChildren = childrenLength > 1;

  const handleContentClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleChange = (newSlideIndex: number): void => {
    setSlideIndex(newSlideIndex);
  };

  // TODO:
  // React.useEffect(() => {
  //   if (onSlideChange) {
  //     onSlideChange(modulo(slideIndex, React.Children.count(children)));
  //   }
  // }, [slideIndex, onSlideChange, children]);

  const classes = useStyles();

  const Carousel = () => (
    <SwipeableCarouselView
      autoplay={open && autoplay && hasMultipleChildren}
      className={classes.carousel}
      containerStyle={{ height: '100%', ...containerStyle }}
      index={slideIndex}
      interval={interval}
      onChangeIndex={handleChange}
      slideClassName={classes.slide}
    >
      {React.Children.map<SwipeableCarouselViewChild, CarouselChild>(
        children,
        (child: CarouselChild) => React.cloneElement(child, { mobile, landscape: useLandscapeMode }),
      )}
    </SwipeableCarouselView>
  );

  const Footer = () => (
    <div style={useLandscapeMode ? { minWidth: 300, maxWidth: 'calc(50% - 48px)', padding: 24, float: 'right' } : {}}>
      <div
        className={cn(classes.footer, {
          [classes.footerMobile]: mobile,
          [classes.footerMobileLandscape]: useLandscapeMode,
        })}
      >
        {label && (
          <Button
            variant="contained"
            onClick={onStart}
            {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
          >
            {label}
          </Button>
        )}
        {hasMultipleChildren && (
          <Dots
            count={childrenLength}
            index={modulo(slideIndex, childrenLength)}
            className={cn(classes.dots, {
              [classes.dotsMobile]: mobile,
              [classes.dotsMobileLandscape]: useLandscapeMode,
            })}
            onDotClick={handleChange}
          />
        )}
      </div>
    </div>
  );

  const shouldShowArrows = !mobile && !hideArrows && hasMultipleChildren;
  const decreaseIndex = (): void => setSlideIndex(slideIndex - 1);
  const increaseIndex = (): void => setSlideIndex(slideIndex + 1);

  const Arrows = () => (
    <div>
      <Fab className={cn(classes.arrow, classes.arrowLeft)} onClick={decreaseIndex}>
        <ArrowBackIcon className={classes.arrowIcon} />
      </Fab>
      <Fab className={cn(classes.arrow, classes.arrowRight)} onClick={increaseIndex}>
        <ArrowForwardIcon className={classes.arrowIcon} />
      </Fab>
    </div>
  );

  return (
    <Modal
      className={classes.root}
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={backdropProps ? { transitionDuration, ...backdropProps } : { transitionDuration }}
    >
      <Fade appear in={open} timeout={transitionDuration}>
        <div
          role="button"
          className={cn({
            [classes.content]: !large,
            [classes.contentLarge]: large,
            [classes.contentMobile]: mobile,
          })}
          onClick={handleContentClick}
          onKeyPress={handleContentClick}
          tabIndex={0}
        >
          <Carousel />
          {!hideFooter && <Footer />}
          {shouldShowArrows && <Arrows />}
        </div>
      </Fade>
    </Modal>
  );
}

export default AutoRotatingCarousel;
