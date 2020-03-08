import { createStyles } from '@material-ui/core/styles';

const cardFooterStyle = () => createStyles({
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '0.9375rem 1.875rem',
    paddingTop: 0,
  },
  cardFooterProfile: {
    marginTop: '-15px',
  },
  cardFooterPlain: {
    paddingLeft: '5px',
    paddingRight: '5px',
    backgroundColor: 'transparent',
  },
  cardFooterPricing: {
    zIndex: 2,
  },
  cardFooterTestimonial: {
    display: 'block',
  },
});

export default cardFooterStyle;
