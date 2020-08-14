import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './style';

const useStyles = makeStyles(styles);

function Rose({ children }: { children: React.ReactNode | React.ReactNodeArray }) {
  const classes = useStyles();
  return (
    <div className={`${classes.defaultFontStyle} ${classes.roseText}`}>
      {children}
    </div>
  );
}

export default Rose;
