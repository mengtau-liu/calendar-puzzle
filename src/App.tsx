import React from 'react'
import './App.css'
import { puzzleVersion, solve } from './solver'
import problem from './problem'
import SolutionView from './components/SolutionView'
import Calendar from './components/Calendar'
import TypeSwitch from './components/TypeSwitch'
import FlipSwitch from './components/FlipSwitch'

type AppState = {
  flipEnable: boolean,
  version: puzzleVersion,
  month: number, // 0 - 11
  day: number, // 1 - 31
  week: number, // 0-6
  solutions: { index: number, j: number }[][],
  index: number,
  serial: number,
}

export default class App extends React.PureComponent<{}, AppState> {
  solve = (version: puzzleVersion, month: number, day: number, week: number, flipEnable: boolean = false) => {
    const board = problem[version].map((row: string) => row.split(''))

    board[Math.floor(month / 6)][month % 6] = 'x'
    if (version === 'V2') {
      board[Math.floor((day - 1) / 7) + 2][(day - 1) % 7] = 'x'
      board[Math.floor(week / 4) + 6][week % 4 + 3 + Math.floor(week / 4)] = 'x'
    }
    if (version === 'V2Beta') {
      board[2][week] = 'x'
      board[Math.floor((day - 1) / 7) + 3][(day - 1) % 7] = 'x'
    }
    return solve(board, flipEnable)
  }

  state: AppState = {
    flipEnable: false,
    version: 'V2',
    month: new Date().getMonth(), // 0 - 11
    day: new Date().getDate(), // 1 - 31
    week: new Date().getDay(), // 0-6
    solutions: this.solve('V2', new Date().getMonth(), new Date().getDate(), new Date().getDay(), false),
    index: 0,
    serial: 1,
  }

  handleChange = ({ month, day, week }: { month: number, day: number, week: number }) => {
    const date = new Date()
    date.setDate(day)
    date.setMonth(month)
    this.setState(({ version, flipEnable }) => ({
      month, day, week: date.getDay(), solutions: this.solve(version, month, day, date.getDay(), flipEnable), index: 0,
    }))
  }
  handleTypeChange = (version: puzzleVersion) => this.setState(({ flipEnable, month, day, week }) => ({
    version, solutions: this.solve(version, month, day, week, flipEnable), index: 0,
  }))
  handleFlipChange = (flipEnable: boolean) => this.setState(({ version, month, day, week }) => ({
    flipEnable, solutions: this.solve(version, month, day, week, flipEnable), index: 0,
  }))
  render() {
    const { flipEnable, version, month, day, week, solutions, index } = this.state
    return (
      <div className="App">
        <h3>
          Calendar Puzzle Solver v2
        </h3>
        <h5>原创设计:天心&nbsp;&nbsp;淘宝店铺:<a href="https://m.tb.cn/h.4DZuXSN?sm=4c6974">萌叔拼图</a ></h5>
        版本：<TypeSwitch version={version} onChange={this.handleTypeChange} />&nbsp;&nbsp;&nbsp;
        <FlipSwitch flipEnable={flipEnable} onChange={this.handleFlipChange} />
        <div className="Container">
          <Calendar version={version} month={month} day={day} week={week} onChange={this.handleChange} />
          {solutions[index] && <SolutionView flipEnable={flipEnable} solution={solutions[index]} />}
        </div>
        <div style={{ color: '#333' }}>
          {`${month + 1}月${day}日  解法编号：${index + 1}(共${solutions.length}种)`}
        </div>
        {solutions.length > 0
          ? (
            <div className="Solutions">
              <input onChange={e => this.setState({ serial: parseInt(e.target.value) })} defaultValue="1"></input>
              <div
                className='SolutionItem selected'
                onClick={() => {
                  this.setState({ index: this.state.serial - 1 })
                }}
              >查看</div>
            </div>
          )
          : (
            <div>无解？？？！！</div>
          )}
      </div>
    )
  }

}