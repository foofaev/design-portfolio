import React, { Component } from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
  containerStyle?: React.CSSProperties;
  interval?: number;
  label: string;
  landscape?: boolean;
  mobile?: boolean;
  onSlideChange?: Function;
  onStart?: (event: React.SyntheticEvent) => void;
  hideArrows?: boolean;
  children: CarouselChild[];
}

function AutoRotatingCarousel(props: CarouselProps) {
  const {
    buttonProps,
    children,
    containerStyle,
    label,
    landscape: landscapeProp,
    onClose,
    onStart,
    onSlideChange,
    autoplay = true,
    interval = 3000,
    mobile = false,
    open = false,
    hideArrows = false,
    BackdropProps: backdropProps,
  } = props;

  const landscape = mobile && landscapeProp;
  const transitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };
  const hasMultipleChildren = React.Children.count(children) > 1;
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleContentClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleChange = (newSlideIndex: number): void => {
    setSlideIndex(newSlideIndex);
  };
  const decreaseIndex = () => setSlideIndex(slideIndex - 1);
  const increaseIndex = () => setSlideIndex(slideIndex + 1);

  React.useEffect(() => {
    if (onSlideChange) {
      onSlideChange(modulo(slideIndex, React.Children.count(children)));
    }
  }, [slideIndex, onSlideChange, children]);

  const classes = useStyles();

  const carousel = (
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
        (child: CarouselChild) => React.cloneElement(child, { mobile, landscape }),
      )}
    </SwipeableCarouselView>
  );

  const childrenLength = React.Children.count(children);

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
          className={cn(classes.content, {
            [classes.contentMobile]: mobile,
          })}
          onClick={handleContentClick}
          onKeyPress={handleContentClick}
          tabIndex={0}
        >
          <Paper elevation={mobile ? 0 : 1} className={classes.carouselWrapper}>
            {carousel}
          </Paper>
          <div
            style={landscape ? { minWidth: 300, maxWidth: 'calc(50% - 48px)', padding: 24, float: 'right' } : undefined}
          >
            <div
              className={cn(classes.footer, {
                [classes.footerMobile]: mobile,
                [classes.footerMobileLandscape]: landscape,
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
                    [classes.dotsMobileLandscape]: landscape,
                  })}
                  onDotClick={handleChange}
                />
              )}
            </div>
          </div>
          {!mobile && !hideArrows && hasMultipleChildren && (
            <div>
              <Fab className={cn(classes.arrow, classes.arrowLeft)} onClick={() => decreaseIndex()}>
                <ArrowBackIcon className={classes.arrowIcon} />
              </Fab>
              <Fab className={cn(classes.arrow, classes.arrowRight)} onClick={() => increaseIndex()}>
                <ArrowForwardIcon className={classes.arrowIcon} />
              </Fab>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}

export default AutoRotatingCarousel;
