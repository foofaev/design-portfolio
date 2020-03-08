import React from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  icon: typeof SvgIcon;
  title: string;
  description: React.ReactChild;
  iconColor?: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'gray';
  vertical?: boolean;
  className?: string;
};

const InfoArea: React.FC<Props> = ({ title, description, iconColor = 'gray', vertical, className = '', icon: PropIcon }: Props) => {
  const classes = useStyles();
  const iconWrapper = cn({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = cn({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });
  const infoAreaClasses = cn({
    [classes.infoArea]: true,
    [className]: !!className,
  });

  return (
    <div className={infoAreaClasses}>
      <div className={iconWrapper}>
        <PropIcon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
};

export default InfoArea;
