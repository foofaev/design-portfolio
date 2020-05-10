import { createStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { container, card } from '../../../theme/theme';

export default (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardHeader: {
    color: grey[900],
    margin: '0',
    fontSize: '20px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
  },
});
