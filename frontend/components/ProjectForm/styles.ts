import { createStyles, Theme } from '@material-ui/core/styles';
import imageStyles from '../../theme/images';

export default (theme: Theme) => createStyles({
  ...imageStyles,
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});
