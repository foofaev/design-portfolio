import { createStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const styles = () => createStyles({
  root: {
    backgroundColor: blue[500],
    height: '100%',
  },
  rootMobileLandscape: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      maxHeight: '100%',
    },
  },
  mediaMobile: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  slideWrapper: {
    overflow: 'hidden',
    borderRadius: 14,
    transform: 'scale(1.0)',
    background: 'transparent',
    height: '100%',
  },
  mediaMobileLandscape: {},
  mediaBackground: {
    backgroundColor: blue[700],
    height: 'calc(100% - 216px)',
    textAlign: 'center',
  },
  mediaBackgroundMobile: {
    height: 'calc(100% - 241px)',
  },
  mediaBackgroundMobileLandscape: {
    height: '100%',
    flex: '1 1',
    alignSelf: 'stretch',
  },
  image: {
    backgroundColor: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      maxHeight: '100%',
      borderRadius: '6px',
    },
  },
  text: {
    textAlign: 'center',
    maxWidth: '80%',
    margin: '0 auto',
    paddingTop: 32,
  },
  textMobile: {
    paddingTop: 30,
    '& $title': {
      marginBottom: 8,
    },
  },
  textMobileLandscape: {
    minWidth: 300,
    maxWidth: 'calc(50% - 48px)',
    padding: '24px 24px 128px',
    flex: '0 1',
    alignSelf: 'center',
    textAlign: 'left',
    margin: 0,
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
    marginBottom: 12,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: '#fff',
  },
  subtitle: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: 0,
    color: '#fff',
  },
});

export default styles;
