import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid, { GridProps } from '@material-ui/core/Grid';

const styles = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
};

const useStyles = makeStyles(() => createStyles(styles));

interface Props extends GridProps {
  children: React.ReactNode | React.ReactNodeArray;
  className?: string;
}

function GridContainer({ children, className = '', ...rest }: Props) {
  const classes = useStyles();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid container {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

export default GridContainer;
