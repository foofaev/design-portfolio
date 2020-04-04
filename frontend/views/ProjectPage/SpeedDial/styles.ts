import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(10),
  },
});

export default styles;
