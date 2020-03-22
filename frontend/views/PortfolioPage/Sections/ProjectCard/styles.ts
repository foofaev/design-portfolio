import { createStyles } from '@material-ui/core/styles';

import { coloredShadow, description } from '../../../../theme/theme';
import imagesStyles from '../../../../theme/images';

const styles = () => createStyles({
  cardDescription: {
    ...description,
  },
  coloredShadow,
  imgCard: imagesStyles.imgCard,
  imgCardExtended: {
    transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
    '&:hover': {
      transform: 'translate3d(0, -10px, 0)',
    },
  },
});

export default styles;
