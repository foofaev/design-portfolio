import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './style';

const useStyles = makeStyles(styles);

function Small({ children }: { children: React.ReactNode | React.ReactNodeArray }) {
  const classes = useStyles();
  return (
    <div className={`${classes.defaultFontStyle} ${classes.smallText}`}>
      {children}
    </div>
  );
}

export default Small;
