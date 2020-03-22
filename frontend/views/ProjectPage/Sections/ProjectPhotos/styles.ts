import { createStyles, Theme } from '@material-ui/core/styles';
import imagesStyles from '../../../../theme/images';
import { coloredShadow } from '../../../../theme/theme';

const carouselStyle = () => createStyles({
  ...imagesStyles,
  coloredShadow,
  imageMargin: {
    marginTop: '20px',
    marginBottom: '20px',
  },
});

export default carouselStyle;
