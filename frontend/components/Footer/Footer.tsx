import React from 'react';
import cn from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

export type FooterProps = {
  theme?: 'dark' | 'white' | 'transparent';
  big?: boolean;
  className?: string;
  children?: React.ReactNode | React.ReactNodeArray;
};

function Footer({ children, theme, big, className = '' }: FooterProps) {
  const classes = useStyles();

  const footerClasses = cn({
    [classes.footer]: true,
    [classes.white]: theme === 'white',
    [classes.dark]: theme === 'dark',
    [classes.big]: big || !!children,
    [className]: !!className,
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        {children ? (
          <div>
            <div className={classes.content}>{children}</div>
            <hr />
          </div>
        ) : (
          ''
        )}
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <a href="https://github.com/foofaev/design-portfolio" target="_blank" className={classes.block} rel="noopener noreferrer">
              foofaev_team
            </a>
          </ListItem>
        </List>
        <div className={classes.clearFix} />
      </div>
    </footer>
  );
}

export default Footer;
