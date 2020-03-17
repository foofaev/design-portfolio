import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';

import styles from './slideStyles';

const useStyles = makeStyles(styles);

export type SlideProps = {
  media: React.ReactNode;
  mediaBackgroundStyle?: React.CSSProperties;
  subtitle: string;
  title: string;
  mobile?: boolean;
  landscape?: boolean;
  style?: React.CSSProperties;
};

function Slide(props: SlideProps) {
  const { media, mediaBackgroundStyle, subtitle, title, mobile, landscape, style } = props;
  const classes = useStyles();

  const mobileLandscape = mobile && landscape;

  return (
    <div
      className={classNames(classes.root, {
        [classes.rootMobileLandscape]: mobileLandscape,
      })}
      style={style}
    >
      <div
        className={classNames(classes.mediaBackground, {
          [classes.mediaBackgroundMobile]: mobile,
          [classes.mediaBackgroundMobileLandscape]: mobileLandscape,
        })}
        style={mediaBackgroundStyle}
      >
        <div
          className={classNames(classes.media, {
            [classes.mediaMobile]: mobile,
            [classes.mediaMobileLandscape]: mobileLandscape,
          })}
        >
          {media}
        </div>
      </div>
      <div
        className={classNames(classes.text, {
          [classes.textMobile]: mobile,
          [classes.textMobileLandscape]: mobileLandscape,
        })}
      >
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.subtitle}>{subtitle}</Typography>
      </div>
    </div>
  );
}

export default Slide;
