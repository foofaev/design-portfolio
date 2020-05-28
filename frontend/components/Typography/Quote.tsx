import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import styles from './style';

const useStyles = makeStyles(styles);

type Props = {
  text: React.ReactNode | React.ReactNodeArray;
  author: React.ReactNode | React.ReactNodeArray;
  textClassName?: string;
  authorClassName?: string;
};

export default function Quote(props: Props) {
  const { text, author, authorClassName = '', textClassName = '' } = props;
  const classes = useStyles();
  const quoteClasses = cn(classes.defaultFontStyle, classes.quote);
  const quoteTextClasses = cn({
    [classes.quoteText]: true,
    [textClassName]: !!textClassName,
  });
  const quoteAuthorClasses = cn({
    [classes.quoteAuthor]: true,
    [authorClassName]: !!authorClassName,
  });
  return (
    <blockquote className={quoteClasses}>
      <p className={quoteTextClasses}>{text}</p>
      <small className={quoteAuthorClasses}>{author}</small>
    </blockquote>
  );
}
