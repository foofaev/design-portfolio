import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});
