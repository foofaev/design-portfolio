import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import styles from './style';

const useStyles = makeStyles(styles);

type Props = {
  className?: string,
  plain?: boolean,
  profile?: boolean,
  blog?: boolean,
  raised?: boolean,
  background?: boolean,
  pricing?: boolean,
  testimonial?: boolean,
  color?: 'primary'| 'info' | 'success' | 'warning' | 'danger' | 'rose',
  product?: boolean,
  children?: React.ReactNode
  style?: React.CSSProperties
};

function Card(props: Props) {
  const {
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color = 'primary',
    product,
    testimonial,
    ...rest
  } = props;
  const classes = useStyles();
  const cardClasses = cn({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default Card;
