import { createStyles } from '@material-ui/core/styles';
import { grayColor, container, title, coloredShadow } from '../../../../theme/theme';

import imagesStyles from '../../../../theme/images';

const sectionTextStyle = () => createStyles({
  container,
  title,
  section: {
    paddingBottom: '0',
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    padding: '20px 0',
    '& p': {
      fontSize: '1.188rem',
      lineHeight: '1.5em',
      color: grayColor[15],
      marginBottom: '30px',
    },
  },
  quoteText: {
    fontSize: '1.5rem !important',
  },
  ...imagesStyles,
  imageMargin: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  card: {
    marginBottom: '60px',
    textAlign: 'center',
  },
  coloredShadow,
  cardCategory: {
    marginBottom: 0,
    marginTop: '10px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      position: 'relative',
      top: '8px',
      lineHeight: 0,
    },
  },
});

export default sectionTextStyle;
