import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';

import styles from './headerStyle';

type Props = {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'transparent' | 'white' | 'rose' | 'dark';
  rightLinks?: React.ReactChild | React.ReactChildren;
  leftLinks?: React.ReactChild | React.ReactChildren;
  brand?: string;
  fixed?: boolean;
  absolute?: boolean;
  changeColorOnScroll?: {
    height: number;
    color: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'rose' | 'dark';
  };
};

const useStyles = makeStyles(styles);

const Header: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const headerColorChange = () => {
    const { color = 'transparent', changeColorOnScroll } = props;
    if (!changeColorOnScroll) return;

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body.getElementsByTagName('header')[0].classList.remove(classes[color]);
      document.body.getElementsByTagName('header')[0].classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body.getElementsByTagName('header')[0].classList.add(classes[color]);
      document.body.getElementsByTagName('header')[0].classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  // TODO: use '@material-ui/core/useScrollTrigger'
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange);
      }
    };
  });
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = cn({
    [classes.appBar]: true,
    [classes[color || 'transparent']]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  const brandComponent = <Button className={classes.title}>{brand}</Button>;

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks && brandComponent}
        <div className={classes.flex}>
          {leftLinks ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

export default Header;
