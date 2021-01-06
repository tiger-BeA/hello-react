import React from 'react';

interface PropsType {
  value?: string;
  onCustomClick: () => void
}

export function Square({ value, onCustomClick }: PropsType) {
  return (
    <div className="square"
         onClick={onCustomClick}
    >
      {value}
    </div>
  );
}
