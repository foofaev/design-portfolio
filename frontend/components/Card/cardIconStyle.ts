import { createStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
} from '../../theme/theme';

const cardIconStyle = (theme: Theme) => createStyles({
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader': {
      borderRadius: '3px',
      backgroundColor: grey[50],
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
});

export default cardIconStyle;
