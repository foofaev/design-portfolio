import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid, { GridProps } from '@material-ui/core/Grid';

const styles = {
  grid: {
    position: 'relative' as 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
};

const useStyles = makeStyles(() => createStyles(styles));

interface Props extends GridProps {
  className?: string
}

function GridItem({ children, className = '', ...rest }: Props) {
  const classes = useStyles();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid item {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
}

export default GridItem;
