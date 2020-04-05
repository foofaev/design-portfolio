import { createStyles, Theme } from '@material-ui/core/styles';

import { container, roseColor } from '../../../theme/theme';

const styles = (theme: Theme) => createStyles({
  // container: {
  //   ...containerFluid,
  //   marginRight: theme.spacing(2),
  //   marginLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(3),
  //   paddingLeft: theme.spacing(3),
  // },
  root: {
    marginTop: '4.284rem',
    marginBottom: '50px',
  },
  container,
  pills: {
    float: 'left',
    position: 'relative',
    display: 'block',
    borderRadius: '30px',
    minWidth: '80px',
    textAlign: 'center',
    transition: 'all .3s',
    padding: '5px 10px',
    height: 'auto',
    opacity: '1',
    maxWidth: '100%',
    margin: '0 5px',
    minHeight: 'unset',
    lineHeight: '24px',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 500,
    marginTop: '-30px',
  },
  flexContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  tabRoot: {
    marginTop: '20px',
    paddingLeft: '0',
    marginBottom: '0',
    overflow: 'visible !important',
  },
  displayNone: {
    display: 'none !important',
  },
  fixed: {
    overflow: 'visible !important',
  },
  tabWrapper: {
    color: 'inherit',
    position: 'relative',
    fontSize: '12px',
    lineHeight: '24px',
    fontWeight: 500,
    textTransform: 'uppercase',
    '&,& *': {
      letterSpacing: 'normal',
    },
  },
  rose: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: roseColor[0],
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)',
    },
  },
});

export default styles;
