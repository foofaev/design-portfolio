import { createStyles } from '@material-ui/core/styles';
import { boxShadow } from '../../theme/theme';

const cardAvatarStyle = () => createStyles({
  cardAvatar: {
    '&$cardAvatarProfile img,&$cardAvatarTestimonial img': {
      width: '100%',
      height: 'auto',
    },
  },
  cardAvatarProfile: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: 0,
    ...boxShadow,
    '&$cardAvatarPlain': {
      marginTop: 0,
    },
  },
  cardAvatarPlain: {},
  cardAvatarTestimonial: {
    margin: '-50px auto 0',
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: 0,
    ...boxShadow,
    '&$cardAvatarPlain': {
      marginTop: 0,
    },
  },
  cardAvatarTestimonialFooter: {
    marginBottom: '-50px',
    marginTop: '10px',
  },
});

export default cardAvatarStyle;
