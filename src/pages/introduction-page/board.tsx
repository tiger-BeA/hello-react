import React from 'react';
import { Step } from '../../data/step';
import { Square } from './square';

// eslint-disable-next-line react/no-unused-prop-types
type PropsType = Step & { readonly onCustomClick: (index: number) => void };

export const Board = (props: PropsType) => {
  return (
    <div>
      <div className="board-row">
        {renderSquare(props, 0)}
        {renderSquare(props, 1)}
        {renderSquare(props, 2)}
      </div>
      <div className="board-row">
        {renderSquare(props, 3)}
        {renderSquare(props, 4)}
        {renderSquare(props, 5)}
      </div>
      <div className="board-row">
        {renderSquare(props, 6)}
        {renderSquare(props, 7)}
        {renderSquare(props, 8)}
      </div>
    </div>
  );
};

function renderSquare({ squares, onCustomClick }: PropsType, index: number) {
  return <Square value={squares[index]} onCustomClick={() => onCustomClick(index)} />;
}
