import { createStyles } from '@material-ui/core/styles';

import imagesStyle from '../../../theme/images';

const styles = () => createStyles({
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
    },
  },
  image: {
    ...imagesStyle.imgRaised,
    ...imagesStyle.imgRoundedCircle,
    ...imagesStyle.imgFluid,
  },
});

export default styles;
