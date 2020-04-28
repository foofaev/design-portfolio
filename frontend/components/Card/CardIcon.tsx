import React from 'react';

import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardIconStyle';

const useStyles = makeStyles(styles);

export type CardIconProps = {
  className?: string;
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
  children: React.ReactNode | React.ReactNodeArray;
};

const CardIcon: React.FC<CardIconProps> = ({ className = '', children, color = 'primary', ...rest }: CardIconProps) => {
  const classes = useStyles();
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[`${color}CardHeader` as 'primaryCardHeader']]: !!color,
    [className]: !!className,
  });
  return (
    // eslint-disable-next-line
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardIcon;
