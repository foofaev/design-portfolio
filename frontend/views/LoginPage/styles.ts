import { createStyles, Theme } from '@material-ui/core/styles';
import { container, description, cardTitle, whiteColor, grayColor } from '../../theme/theme';

const rgbBlack = '0, 0, 0';

const styles = (theme: Theme) => createStyles({
  description,
  cardTitle: {
    ...cardTitle,
    color: `${whiteColor}  !important`,
  },
  container: {
    ...container,
    zIndex: 4,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  pageHeader: {
    color: whiteColor,
    border: '0',
    height: '100%',
    margin: '0',
    display: 'flex!important',
    padding: '120px 0',
    position: 'relative',
    minHeight: '100vh',
    alignItems: 'center',
    '&:before': {
      background: `rgba(${rgbBlack}, 0.5)`,
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""',
    },
  },
  form: {
    margin: '0',
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0',
  },
  inputIconsColor: {
    color: grayColor[13],
  },
  textCenter: {
    textAlign: 'center',
  },
  iconButtons: {
    marginRight: '3px !important',
    marginLeft: '3px !important',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    background: 'transparent',
    bottom: '0',
    color: whiteColor,
    zIndex: 2,
  },
  button: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  mainLink: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
});

export default styles;
