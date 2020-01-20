import { createStyles } from '@material-ui/core/styles';

import {
  blackColor,
  whiteColor,
  grayColor,
  roseColor,
  primaryColor,
  successColor,
  dangerColor,
  warningColor,
  infoColor,
  hexToRgb,
} from '../../theme/theme';

const hexBlack = hexToRgb(blackColor);
const hexWhite = hexToRgb(whiteColor);
const cardStyle = () => createStyles({
  card: {
    border: '0',
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
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none',
  },
  cardProfile: {
    marginTop: '30px',
    textAlign: 'center',
  },
  cardBlog: {
    marginTop: '60px',
  },
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
  cardPricing: {
    textAlign: 'center',
    '&:after': {
      backgroundColor: `rgba(${hexBlack}, 0.7) !important`,
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      maxWidth: '240px',
      margin: '10px auto',
    },
    '& ul li': {
      color: grayColor[0],
      textAlign: 'center',
      padding: '12px 0px',
      borderBottom: `1px solid rgba(${hexToRgb(grayColor[0])}, 0.3)`,
    },
    '& ul li:last-child': {
      border: 0,
    },
    '& ul li b': {
      color: grayColor[1],
    },
    '& h1': {
      marginTop: '30px',
    },
    '& h1 small': {
      display: 'inline-flex',
      height: 0,
      fontSize: '18px',
    },
    '& h1 small:first-child': {
      position: 'relative',
      top: '-17px',
      fontSize: '26px',
    },
    '& ul li svg,& ul li .fab,& ul li .fas,& ul li .far,& ul li .fal,& ul li .material-icons': {
      position: 'relative',
      top: '7px',
    },
  },
  cardPricingColor: {
    '& ul li': {
      color: whiteColor,
      borderColor: `rgba(${hexWhite}, 0.3)`,
      '& b, & svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
        color: whiteColor,
        fontWeight: '700',
      },
    },
  },
  cardProduct: {
    marginTop: '30px',
  },
  primary: {
    background:
      `linear-gradient(60deg,${primaryColor[1]}, ${primaryColor[2]})`,
    '& h1 small': {
      color: `rgba(${hexWhite}, 0.8)`,
    },
    color: whiteColor,
  },
  info: {
    background: `linear-gradient(60deg, ${infoColor[1]},${infoColor[2]})`,
    '& h1 small': {
      color: `rgba(${hexWhite}, 0.8)`,
    },
    color: whiteColor,
  },
  success: {
    background: `linear-gradient(60deg, ${successColor[1]}, ${successColor[2]})`,
    '& h1 small': {
      color: `rgba(${hexWhite}, 0.8)`,
    },
    color: whiteColor,
  },
  warning: {
    background: `linear-gradient(60deg, ${warningColor[1]}, ${warningColor[2]})`,
    '& h1 small': {
      color: `rgba(${hexWhite}, 0.8)`,
    },
    color: whiteColor,
  },
  danger: {
    background: `linear-gradient(60deg,${dangerColor[1]},${dangerColor[2]})`,
    '& h1 small': {
      color: `rgba(${hexWhite}, 0.8)`,
    },
    color: whiteColor,
  },
  rose: {
    background: `linear-gradient(60deg, ${roseColor[1]},${roseColor[2]})`,
    '& h1 small': {
      color: `rgba(${hexWhite}, 0.8)`,
    },
    color: whiteColor,
  },
  cardBody: {
    padding: '0.9375rem 1.875rem',
    flex: '1 1 auto',
    WebkitBoxFlex: '1',
  },
  cardBodyBackground: {
    position: 'relative',
    zIndex: '2',
    minHeight: '280px',
    paddingTop: '40px',
    paddingBottom: '40px',
    maxWidth: '440px',
    margin: '0 auto'
  },
  cardBodyPlain: {
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  cardBodyFormHorizontal: {
    paddingLeft: '15px',
    paddingRight: '15px',
    '& form': {
      margin: '0'
    }
  },
  cardPricing: {
    padding: '15px!important',
    margin: '0px!important'
  },
  cardSignup: {
    padding: '0px 30px 0px 30px'
  },
  cardBodyColor: {
    borderRadius: '6px',
    '& h1,& h2,& h3': {
      "& small": {
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
      },
    },
  },
});

export default cardStyle;
