import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardBodyStyle';

const useStyles = makeStyles(styles);

type Props = {
  className?: string;
  background?: boolean;
  plain?: boolean;
  formHorizontal?: boolean;
  pricing?: boolean;
  signup?: boolean;
  color?: boolean;
  children?: React.ReactNode | React.ReactNodeArray;
};

function CardBody(props: Props) {
  const { className = '', children, background, plain, formHorizontal, pricing, signup, color, ...rest } = props;
  const classes = useStyles();
  const cardBodyClasses = cn({
    [classes.cardBody]: true,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyFormHorizontal]: formHorizontal,
    [classes.cardPricing]: pricing,
    [classes.cardSignup]: signup,
    [classes.cardBodyColor]: color,
    [className]: !!className,
  });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardBody;
