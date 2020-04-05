import { createStyles } from '@material-ui/core/styles';
import commonColors from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';

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
      color: commonColors.black,
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
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: grey[600],
  },
  parallax: {
    height: '380px',
  },
});

export default style;
