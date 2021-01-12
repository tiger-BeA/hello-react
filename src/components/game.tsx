import React from 'react';
import { Player } from '../data/player';
import { Step } from '../data/step';
import { calculateWinner } from '../utils/calc';
import { Board } from './board';

interface StateType {
  readonly history: Step[];
  readonly player: 'X' | 'O';
  readonly stepNumber: number;
}

export class Game extends React.Component<unknown, StateType> {
  public constructor(props: unknown) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9),
        },
      ],
      player: 'X',
      stepNumber: 0,
    };
  }

  public render() {
    const currentSquares = this.getCurrentSquares();
    const winner = calculateWinner(currentSquares);
    const status = winner ? `Winner：${winner}` : `Next player: ${this.state.player}`;
    const desc = this.getHistoryDesc();

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} onCustomClick={(index) => this.handleClick(index)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{desc}</ol>
        </div>
      </div>
    );
  }

  private handleClick(index: number) {
    const squares = this.getCurrentSquares();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = this.state.player;
    this.add2History(squares);
    this.togglePlayer();
  }

  private togglePlayer() {
    this.setState({ player: this.state.player === 'X' ? 'O' : 'X' });
  }

  private getCurrentSquares() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    return history[history.length - 1].squares.slice();
  }

  private add2History(squares: (Player | undefined)[]) {
    const { history } = this.state;
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: this.state.stepNumber + 1,
    });
  }

  private getHistoryDesc() {
    return this.state.history.map((step, index) => {
      const desc = index ? `Go to move #${index}` : 'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });
  }

  private jumpTo(index: number) {
    this.setState({
      stepNumber: index,
      player: index % 2 === 0 ? 'X' : 'O',
    });
    this.setState({ history: this.state.history.slice(0, index + 1) });
  }
}
