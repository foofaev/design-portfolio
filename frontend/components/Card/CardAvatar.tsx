import * as React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './cardAvatarStyle';

const useStyles = makeStyles(styles);

type Props = {
  children?: React.ReactNode | React.ReactNodeArray;
  className?: string;
  profile?: boolean;
  plain?: boolean;
  testimonial?: boolean;
  testimonialFooter?: boolean;
};

function CardAvatar(props: Props) {
  const { children, className = '', plain, profile, testimonial, testimonialFooter, ...rest } = props;
  const classes = useStyles();
  const cardAvatarClasses = cn({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [classes.cardAvatarTestimonial]: testimonial,
    [classes.cardAvatarTestimonialFooter]: testimonialFooter,
    [className]: !!className,
  });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardAvatar;
