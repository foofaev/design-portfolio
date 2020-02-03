import { createStyles } from '@material-ui/core/styles';

import { cardTitle, coloredShadow, container } from '../../theme/theme';

const whiteColor = '#FFFFF';
const hexBlack = '0, 0, 0, 0.12';
const hexWhite = '255, 255, 255';

const sectionPillsStyle = () => createStyles({
  cardRaised: {
    boxShadow: `0 16px 38px -12px rgba(${hexBlack}, 0.56), 0 4px 25px 0px rgba(${hexBlack}, 0.12), 0 8px 10px -5px rgba(${hexBlack}, 0.2)`,
  },
  cardBackground: {
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    textAlign: 'center' as 'center',
    color: whiteColor,
    '& h3': {
      color: `${whiteColor} !important`,
    },
    '& p': {
      color: `rgba(${hexWhite},0.7)!important`,
    },
    '&:after': {
      position: 'absolute' as 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'block',
      left: 0,
      top: 0,
      content: '\'\'',
      backgroundColor: `rgba(${hexBlack}, 0.56)`,
      borderRadius: '6px',
    },
    '& small': {
      color: `rgba(${hexWhite}, 0.7) !important`,
    },
  },
  card: {
    border: 0,
    marginBottom: '30px',
    marginTop: '30px',
    borderRadius: '6px',
    color: `rgba(${hexBlack}, 0.87)`,
    background: whiteColor,
    width: '100%',
    boxShadow: `0 2px 2px 0 rgba(${hexBlack}, 0.14), 0 3px 1px -2px rgba(${hexBlack}, 0.2), 0 1px 5px 0 rgba(${hexBlack}, 0.12)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
    // some jss/css to make the cards look a bit better on Internet Explorer
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
      display: 'inline-block !important',
    },
  },
  cardBody: {
    padding: '0.9375rem 1.875rem',
    flex: '1 1 auto',
    WebkitBoxFlex: 1,
  },
  cardBodyBackground: {
    position: 'relative',
    zIndex: 2,
    minHeight: '280px',
    paddingTop: '40px',
    paddingBottom: '40px',
    maxWidth: '440px',
    margin: '0 auto',
  },
  section: {
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    padding: '70px 0',
  },
  textCenter: {
    textAlign: 'center',
  },
  category: {
    color: `rgba(${hexWhite}, 0.7) !important`,
    marginTop: '10px',
  },
  cardTitle: {
    ...cardTitle,
    // color: `${whiteColor} !important`,
  },
  icons: {
    width: '1.1rem',
    height: '1.1rem',
    position: 'relative',
    display: 'inline-block',
    top: '0',
    marginTop: '-1em',
    marginBottom: '-1em',
    marginRight: '4px',
    verticalAlign: 'middle',
  },
  tabSpace: {
    padding: '20px 0 50px',
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important' as 'center',
  },
  coloredShadow,
  container,
});

export default sectionPillsStyle;
