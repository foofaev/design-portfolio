import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
  dots: {
    position: 'relative',
    padding: '20px 0 28px',
  },
  dotOuter: {
    width: 8,
    height: 8,
    padding: 4,
    float: 'left',
    position: 'absolute',
  },
  dot: {
    width: 8,
    height: 8,
    background: '#fff',
    transition: 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    borderRadius: 4,
  },
});

export default styles;
