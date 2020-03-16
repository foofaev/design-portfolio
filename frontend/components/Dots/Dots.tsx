import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

import range from 'lodash/range';
import inRange from 'lodash/inRange';

import styles from './styles';

const useStyles = makeStyles(styles);

type Props = {
  count: number;
  index: number;
  className?: string;
  style?: typeof Object;
  onDotClick: Function;
};

function Dots({ count, index, style, onDotClick }: Props) {
  const classes = useStyles();

  const [previousIndex, setPreviousIndex] = React.useState(index);
  const [timeoutID, setTimeoutID] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (index !== previousIndex) {
      setPreviousIndex(index);
      const timeoutHandler = setTimeout(() => {
        setTimeoutID(null);
        setPreviousIndex(index);
      }, 400);
      setTimeoutID(timeoutHandler);
    }
    return (): void => {
      if (timeoutID !== null) clearTimeout(timeoutID);
    };
  }, [index, previousIndex, timeoutID]);

  const handleDotClick = (dotIndex: number, event: React.SyntheticEvent): void => {
    if (onDotClick) onDotClick(dotIndex, event);
  };

  return (
    <div style={{ ...style, width: count * 16 }} {...other}>
      <div className={classes.dots}>
        {range(count).map((dotIndex) => (
          <div
            key={dotIndex}
            role="button"
            tabIndex={0}
            className={classes.dotOuter}
            style={{
              left: dotIndex * 16,
              cursor: onDotClick ? 'pointer' : 'inherit',
            }}
            onKeyPress={(event) => handleDotClick(dotIndex, event)}
            onClick={(event) => handleDotClick(dotIndex, event)}
          >
            <Paper
              elevation={0}
              className={classes.dot}
              style={{
                opacity: inRange(dotIndex, Math.min(previousIndex, index), Math.max(previousIndex, index)) ? 0 : 0.5,
              }}
            />
          </div>
        ))}
        <Paper
          elevation={0}
          className={classes.dot}
          style={{
            position: 'absolute',
            marginTop: 4,
            left: Math.min(previousIndex, index) * 16 + 4,
            width: Math.abs(previousIndex - index) * 16 + 8,
          }}
        />
      </div>
    </div>
  );
}

export default Dots;
