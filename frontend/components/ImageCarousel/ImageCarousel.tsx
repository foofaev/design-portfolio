import React from 'react';

import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Card from '../Card/Card';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  imageUrls: string[];
};

// TODO: main image should follow breakpoint size
// preview image should be small
// if breakpoint is down md should not show gallery
// const modalStyles = {
//     overlay: {
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(255, 255, 255, 0.95)',
//         zIndex: 21
//     },
//     content: {
//         position: 'absolute',
//         top: '0px',
//         left: '0px',
//         right: '0px',
//         bottom: '0px',
//         border: '0px',
//         backgroundColor: 'transparent',
//         overflow: 'auto',
//         WebkitOverflowScrolling: 'touch',
//         borderRadius: '4px',
//         outline: 'none',
//         padding: '0px'
//     }
// };
//
// function getPopupSliderImageParams({breakpoint}) {
//     if(breakpoint.greaterOrEqual('desktopSm')) return {width: 1920, height: 1080, keepAspect: true, noUpscale: true};
//     if(breakpoint.less('tablet')) return {width: 760, height: 760, keepAspect: true, noUpscale: true};
//     if(breakpoint.less('desktopSm')) return {width: 1024, height: 1024, keepAspect: true, noUpscale: true};
//     return {width: 1920, height: 1080, keepAspect: true, noUpscale: true};
// }
//
function ImageSlider({ imageUrls }: Props) {
  const classes = useStyles();
  const settings = {
    customPaging: (i: number) => (
      <img src={imageUrls[i]} alt={`carousel page ${imageUrls[i]}`} />
    ),
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className={classes.section} id="carousel">
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={10} md={8} className={classes.marginAuto}>
            <Card>
              <Slider {...settings}>
                {imageUrls.map((url) => (
                  <div key={url}>
                    <img src={url} alt="..." className="slick-image" />
                  </div>
                ))}
              </Slider>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default ImageSlider;
