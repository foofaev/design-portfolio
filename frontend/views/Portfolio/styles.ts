import { createStyles } from '@material-ui/core/styles';
import { container, title, main, mainRaised } from '../../theme/theme';

const style = () => createStyles({
  container: {
    ...container,
    zIndex: 1,
  },
  main,
  mainRaised,
  title: {
    ...title,
    zIndex: 3,
    '&, & + h4': {
      zIndex: 3,
      color: '#FFFFFF',
    },
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default style;
