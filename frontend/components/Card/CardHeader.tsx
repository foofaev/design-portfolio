import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardHeaderStyle';

const useStyles = makeStyles(styles);

type Props = {
  className?: string;
  plain?: boolean;
  image?: boolean;
  contact?: boolean;
  signup?: boolean;
  noShadow?: boolean;
  icon?: boolean;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  children?: React.ReactNode | React.ReactNodeArray;
};

function CardHeader(props: Props) {
  const { className = '', children, color = '', plain, image, contact, signup, noShadow, icon, ...rest } = props;
  const classes = useStyles();
  const cardHeaderClasses = cn({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader` as 'primaryCardHeader']]: !!color, // TODO
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderContact]: contact,
    [classes.cardHeaderSignup]: signup,
    [classes.noShadow]: noShadow,
    [className]: !!className,
  });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardHeader;
