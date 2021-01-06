import React from 'react';
import { Step } from './game';
import { Square } from './square';

type PropsType = Step & { onCustomClick: (index: number) => void }

export class Board extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  renderSquare(index: number) {
    return <Square value={this.props.squares[index]}
                   onCustomClick={() => this.props.onCustomClick(index)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
