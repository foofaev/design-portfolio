import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { duration } from '@material-ui/core/styles/transitions';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Modal, { ModalProps } from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dots from '../Dots/Dots';
import Carousel from './SwipeableCarouselView';
import { modulo } from './util';


import styles from './carouselStyles';

const useStyles = makeStyles(styles);

type Props = {
  autoplay?: boolean;
  ButtonProps?: typeof Object;
  containerStyle?: typeof Object;
  interval?: number;
  label: string;
  landscape?: boolean;
  mobile?: boolean;
  modalProps?: ModalProps;
  onChange?: Function;
  onClose?: Function;
  onStart?: Function;
  open?: boolean;
  hideArrows?: boolean;
  children: React.ReactChild | React.ReactChildren;
};

function AutoRotatingCarousel(props: Props) {
  const {
    ButtonProps,
    children,
    containerStyle,
    label,
    landscape: landscapeProp,
    modalProps,
    onClose,
    onStart,
    onChange,
    autoplay = true,
    interval = 3000,
    mobile = false,
    open = false,
    hideArrows = false,
  } = props;

  const landscape = mobile && landscapeProp;
  const transitionDuration = { enter: duration.enteringScreen, exit: duration.leavingScreen };
  const hasMultipleChildren = React.Children.count(children) > 1;
  const [slideIndex, setSlideIndex] = React.useState(0);

  const handleContentClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleChange = (newSlideIndex: number) => {
    setSlideIndex(newSlideIndex);
  };
  const decreaseIndex = () => setSlideIndex(slideIndex - 1);
  const increaseIndex = () => setSlideIndex(slideIndex + 1);

  React.useEffect(() => {
    if (onChange) {
      onChange(modulo(slideIndex, React.Children.count(children)));
    }
  }, [slideIndex, onChange, children]);

  const classes = useStyles();

  const carousel = (
    <Carousel
      autoplay={open && autoplay && hasMultipleChildren}
      className={classes.carousel}
      containerStyle={{ height: '100%', ...containerStyle }}
      index={slideIndex}
      interval={interval}
      onChangeIndex={handleChange}
      slideClassName={classes.slide}
    >
      {React.Children.map(children, (child) => React.cloneElement(child, {
        mobile,
        landscape,
      }))}
    </Carousel>
  );

  return (
    <Modal
      className={classNames(classes.root, {
        [classes.rootMobile]: mobile,
      })}
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={ModalProps ? { transitionDuration, ...ModalProps.BackdropProps } : { transitionDuration }}
      {...ModalProps}
    >
      <Fade appear in={open} timeout={transitionDuration}>
        <div
          className={classNames(classes.content, {
            [classes.contentMobile]: mobile,
          })}
          onClick={this.handleContentClick}
        >
          <Paper elevation={mobile ? 0 : 1} className={classes.carouselWrapper}>
            {carousel}
          </Paper>
          <div style={landscape ? { minWidth: 300, maxWidth: 'calc(50% - 48px)', padding: 24, float: 'right' } : null}>
            <div
              className={classNames(classes.footer, {
                [classes.footerMobile]: mobile,
                [classes.footerMobileLandscape]: landscape,
              })}
            >
              {label && (
                <Button variant="contained" onClick={onStart} {...ButtonProps}>
                  {label}
                </Button>
              )}
              {hasMultipleChildren && (
                <Dots
                  count={children.length}
                  index={modulo(this.state.slideIndex, children.length)}
                  className={classNames(classes.dots, {
                    [classes.dotsMobile]: mobile,
                    [classes.dotsMobileLandscape]: landscape,
                  })}
                  onDotClick={this.handleChange}
                />
              )}
            </div>
          </div>
          {!mobile && !hideArrows && hasMultipleChildren && (
            <div>
              <Fab className={classNames(classes.arrow, classes.arrowLeft)} onClick={() => this.decreaseIndex()}>
                <ArrowBackIcon className={classes.arrowIcon} />
              </Fab>
              <Fab className={classNames(classes.arrow, classes.arrowRight)} onClick={() => this.increaseIndex()}>
                <ArrowForwardIcon className={classes.arrowIcon} />
              </Fab>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}

AutoRotatingCarousel.defaultProps = {
};
