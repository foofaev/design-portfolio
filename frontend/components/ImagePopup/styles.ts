import { createStyles, Theme } from '@material-ui/core/styles';
import { containerFluid } from '../../theme/theme';
import imagesStyles from '../../theme/images';

const carouselStyle = (theme: Theme) => createStyles({
  container: { ...containerFluid },
  marginAuto: {
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
  },
  ...imagesStyles,
  imageMargin: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 3,
  },
  content: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    border: '0px',
    backgroundColor: 'transparent',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '0px',
  },
});

export default carouselStyle;
