import { createStyles } from '@material-ui/core/styles';

import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  boxShadow,
} from '../../theme/theme';

const cardHeaderStyle = () => createStyles({
  cardHeader: {
    borderRadius: '3px',
    padding: '1rem 15px',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '-30px',
    border: 0,
    marginBottom: 0,
  },
  cardHeaderPlain: {
    marginLeft: '0px',
    marginRight: '0px',
    '&$cardHeaderImage': {
      margin: '0 !important',
    },
  },
  cardHeaderImage: {
    position: 'relative',
    padding: 0,
    zIndex: 1,
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '-30px',
    borderRadius: '6px',
    '& img': {
      width: '100%',
      borderRadius: '6px',
      pointerEvents: 'none',
      ...boxShadow,
    },
    '& a': {
      display: 'block',
    },
  },
  noShadow: {
    '& img': {
      boxShadow: 'none !important',
    },
  },
  cardHeaderContact: {
    margin: '0 15px',
    marginTop: '-20px',
  },
  cardHeaderSignup: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '20px 0',
    width: '100%',
    marginBottom: '15px',
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
});

export default cardHeaderStyle;
