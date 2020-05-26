import { createStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import imagesStyle from '../../../theme/images';
import { title } from '../../../theme/theme';
import tooltip from '../../../theme/tooltip';

const styles = (theme: Theme) => createStyles({
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
    },
  },
  name: {
    marginTop: theme.spacing(-10),
  },
  margin: {
    margin: theme.spacing(1),
    padding: '0px',
  },
  title: {
    ...title,
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: grey[800],
  },
  image: {
    ...imagesStyle.imgRaised,
    ...imagesStyle.imgRoundedCircle,
    ...imagesStyle.imgFluid,
  },
  edit: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  editIcon: {
    width: '20px',
    height: '20px',
  },
  editButton: {
    borderRadius: '30px',
    marginTop: '-28px !important',
    paddingLeft: '12px',
    color: 'primary',
    paddingRight: '12px',
    fontSize: '20px',
    height: '41px',
    minWidth: '41px',
    width: '41px',
    '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
      marginRight: '0px',
    },
  },
  ...tooltip(),
});

export default styles;
