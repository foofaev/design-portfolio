import { Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import find from 'lodash/find';

function useWidth(): Breakpoint {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();

  const widthBreakpoint = find(keys, (key) => useMediaQuery(theme.breakpoints.up(key)));

  return widthBreakpoint || 'xs';
}

export default useWidth;
