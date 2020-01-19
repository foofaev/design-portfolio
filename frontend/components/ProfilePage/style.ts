import { createStyles, Theme } from '@material-ui/core/styles';
import { container, title } from '../../theme/theme';

import imagesStyle from '../../theme/images';

const profilePageStyle = (theme: Theme) => createStyles({
  container,
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
    },
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important' as 'center',
  },
  name: {
    marginTop: '-80px',
  },
  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative' as 'relative',
    zIndex: 3,
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  navWrapper: {
    margin: '20px auto 50px auto',
    textAlign: 'center',
  },
  root: {
    marginTop: '20px',
    paddingLeft: '0',
    marginBottom: '0',
    overflow: 'visible !important',
  },
  flexContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  displayNone: {
    display: 'none !important',
  },
  fixed: {
    overflow: 'visible !important',
  },
  horizontalDisplay: {
    display: 'block',
  },
  pills: {
    float: 'left',
    position: 'relative',
    display: 'block',
    borderRadius: '30px',
    minWidth: '100px',
    textAlign: 'center',
    transition: 'all .3s',
    padding: '10px 15px',
    height: 'auto',
    opacity: '1',
    maxWidth: '100%',
    margin: '0 5px',
    minHeight: 'unset',
    lineHeight: '24px',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 500,
  },
  pillsWithIcons: {
    borderRadius: '4px',
  },
  tabIcon: {
    width: '30px',
    height: '30px',
    display: 'block',
    margin: '15px 0 !important',
  },
  horizontalPills: {
    width: '100%',
    float: 'none !important' as 'none',
    '& + button': {
      margin: '10px 0',
    },
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
});

export default profilePageStyle;
