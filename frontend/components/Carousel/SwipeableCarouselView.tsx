import React from 'react';
import { autoPlay, virtualize, bindKeyboard, SlideRendererCallback } from 'react-swipeable-views-utils';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';
import modulo from '../../helpers';

import { SlideProps } from './Slide';
import { CardProps } from '../Card/Card';

export type CarouselChild = React.ReactElement<SlideProps | CardProps>;

export type SwipeableCarouselViewChild = CarouselChild & {
  mobile?: boolean;
  landscape?: boolean;
};

const VirtualizeSwipeViews = bindKeyboard(virtualize(SwipeableViews));
const VirtualizeAutoPlaySwipeViews = autoPlay(VirtualizeSwipeViews);

const carouselSlideRenderer = (
  children: SwipeableCarouselViewChild[],
): SlideRendererCallback => ({ index, key }): SwipeableCarouselViewChild & { key: number | null | string } => { // TODO: hack, remove
  const childrenCount = React.Children.count(children);
  const realIndex = modulo(index, childrenCount);
  const currentChild: SwipeableCarouselViewChild = children[realIndex];

  return React.cloneElement(currentChild, { key });
};

interface Props extends SwipeableViewsProps {
  autoplay: boolean;
  className: string;
  containerStyle: React.CSSProperties;
  index: number;
  interval: number;
  onChangeIndex: (index: number) => void;
  slideClassName: string;
  children: SwipeableCarouselViewChild[];
}

function SwipeableCarouselView(props: Props) {
  const { children, autoplay, className, containerStyle, index, interval, onChangeIndex, slideClassName } = props;
  const slideRenderer = carouselSlideRenderer(children);

  const Views = autoplay ? VirtualizeAutoPlaySwipeViews : VirtualizeSwipeViews;
  return (
    <Views
      className={className}
      containerStyle={containerStyle}
      slideRenderer={slideRenderer}
      index={index}
      interval={interval}
      onChangeIndex={onChangeIndex}
      slideClassName={slideClassName}
    />
  );
}

export default SwipeableCarouselView;
