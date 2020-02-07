import { createStyles } from '@material-ui/core/styles';

const style = () => createStyles({
  parallax: {
    height: '100vh',
    maxHeight: '1600px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    margin: 0,
    padding: 0,
    border: 0,
    display: 'flex',
    alignItems: 'center',
  },
  filter: {
    '&:before': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'block',
      left: 0,
      top: 0,
      content: '\'\'',
    },
  },
  small: {
    height: '65vh',
    minHeight: '65vh',
    maxHeight: '650px',
  },
});

export default style;
