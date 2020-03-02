import { createStyles, Theme } from '@material-ui/core/styles';
import {
  container, title, primaryColor, infoColor, successColor, main, mainRaised,
  warningColor, dangerColor, roseColor, coloredShadow, cardTitle,
} from '../../theme/theme';

const style = (theme: Theme) => createStyles({
  container: {
    ...container,
    zIndex: 1,
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important' as 'center',
  },
  main,
  mainRaised,
  title: {
    ...title,
    zIndex: 3,
    '&, & + h4': {
      zIndex: 3,
      color: '#FFFFFF',
    },
  },
  primary: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: primaryColor[0],
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)',
    },
  },
  info: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: infoColor[0],
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)',
    },
  },
  success: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: successColor[0],
      boxShadow: '0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)',
    },
  },
  warning: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: warningColor[0],
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)',
    },
  },
  danger: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: dangerColor[0],
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)',
    },
  },
  rose: {
    '&,&:hover': {
      color: '#FFFFFF',
      backgroundColor: roseColor[0],
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)',
    },
  },
  horizontalDisplay: {
    display: 'block',
  },
  contentWrapper: {
    marginTop: '20px',
    '& .react-swipeable-view-container > div > div': {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabelContainer: {
    padding: 'unset !important',
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },
  textCenter: {
    textAlign: 'center',
  },
  coloredShadow,
  cardTitle,
  section: {
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    padding: '70px 0',
  },
  gridTile: {
    position: 'relative' as 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
});

export default style;