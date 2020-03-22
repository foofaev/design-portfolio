import * as React from 'react';
import cn from 'classnames';
import pickBy from 'lodash/pickBy';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardStyle';

const useStyles = makeStyles(styles);

export type CardProps = {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  blog?: boolean;
  raised?: boolean;
  background?: boolean;
  pricing?: boolean;
  testimonial?: boolean;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  product?: boolean;
  children: React.ReactChild | React.ReactChildren;
};

function Card(props: CardProps) {
  const {
    className = '',
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color = '',
    product,
    testimonial,
    ...rest
  } = props;
  const classes = useStyles();
  const cardClasses = cn(pickBy({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]: (pricing && !!color) || (pricing && !!background),
    [classes[color || 'primary']]: !!color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [className]: !!className,
  }));
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default Card;
