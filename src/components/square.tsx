import React from 'react';
import type { FC } from 'react';

type PropsType = {
  readonly value?: string;
  readonly onCustomClick: () => void;
};

export const Square: FC<PropsType> = ({ value, onCustomClick }) => {
  return (
    <div className="square" onClick={onCustomClick}>
      {value}
    </div>
  );
};
