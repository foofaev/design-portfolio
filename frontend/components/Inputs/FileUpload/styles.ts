import { createStyles } from '@material-ui/core/styles';
import { boxShadow } from '../../../theme/theme';
// import {  } from '../../theme/images';

const styles = () => createStyles({
  fileInput: {
    textAlign: 'center',
    display: 'inline-block',
    marginBottom: '9px',

    '& input[type="file"]': {
      display: 'none',
    },
    '& form-control': {
      display: 'inline-block',
      paddingTop: '7px',
      paddingBottom: '5px',
      marginBottom: 0,
      verticalAlign: 'middle',
      cursor: 'text',
    },
    '& $thumbnail': {
      display: 'inline-block',
      overflow: 'hidden',
      marginBottom: '10px',
      textAlign: 'center',
      verticalAlign: 'middle',
      maxWidth: '360px',
      ...boxShadow,

      '& > img': {
        maxHeight: '100%',
        verticalAlign: 'middle',
        width: '100%',
      },
    },
    '& $imgCircle': {
      borderRadius: '50%',
      marginBottom: 'auto 10',
      maxWidth: '130px',
      maxHeight: '130px',
    },
  },
  // cardAvatarProfile: {
  //   maxWidth: '130px',
  //   maxHeight: '130px',
  //   margin: '-50px auto 0',
  //   borderRadius: '50%',
  //   overflow: 'hidden',
  //   padding: 0,
  //   ...boxShadow,
  // },
  thumbnail: {
    border: '0 none',
    borderRadius: 0,
    padding: 0,
  },
  imgCircle: {},
});

export default styles;
