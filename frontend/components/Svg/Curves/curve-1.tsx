import * as React from 'react';

type Props = {
  className?: string,
  onClick?: React.MouseEventHandler,
};

const Curve1 = ({ className, onClick }: Props) => (
  <svg onClick={onClick} className={className} viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
  </svg>
);

export default Curve1;