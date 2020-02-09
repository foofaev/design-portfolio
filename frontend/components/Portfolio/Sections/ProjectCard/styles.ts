import { createStyles } from '@material-ui/core/styles';

import { coloredShadow, description } from '../../../../theme/theme';

const styles = () => createStyles({
  cardDescription: {
    ...description,
  },
  coloredShadow,
});

export default styles;
