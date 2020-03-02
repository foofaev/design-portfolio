import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from './cardFooterStyle';

const useStyles = makeStyles(styles);

type Props = {
  className?: string,
  plain?: boolean,
  profile?: boolean,
  pricing?: boolean,
  testimonial?: boolean,
  children?: React.ReactNode | React.ReactNodeArray,
};

function CardFooter(props: Props) {
  const {
    className = '',
    children,
    plain,
    profile,
    pricing,
    testimonial,
    ...rest
  } = props;
  const classes = useStyles();
  const cardFooterClasses = cn({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile || testimonial,
    [classes.cardFooterPricing]: pricing,
    [classes.cardFooterTestimonial]: testimonial,
    [className]: !!className,
  });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardFooter;
