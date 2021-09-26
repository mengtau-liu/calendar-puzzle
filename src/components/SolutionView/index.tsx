import React from 'react'
import './index.css'
import { flatten } from 'lodash'
import { COLS, getFirstXCols, getItemDirections, puzzleVersion } from '../../solver'
import {problem} from '../../problem'

class SolutionView extends React.PureComponent<{
  solution: { index: number, j: number }[], flipEnable:boolean, version: puzzleVersion,
}> {
  colors = [
    '#6B7280',
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#00BFFF',
    '#00FA9A',
  ]

  render() {
    const { solution, flipEnable, version } = this.props
    const firstXCols = getFirstXCols(flipEnable, version)
    const itemDirections = getItemDirections(flipEnable, version)
    return (
      <div className="SolutionView">
        {problem[version].block.map((item, i) => {
          const { index, j } = solution[i]
          const row = Math.floor(index / COLS)
          const col = index % COLS
          const firstXCol = firstXCols[i][j]
          const direction = itemDirections[i][j]

          const hwDiff = item.length - item[0].length
          const needDiff = (direction === 1 || direction === 3 || direction === 4 || direction === 6)
          return (
            <div
              key={i}
              className="SolutionViewItem"
              style={{
                top: row * 40,
                left: (col - firstXCol) * 40,
                width: item[0].length * 40,
                height: item.length * 40,
                transform: [
                  `translate3d(${needDiff ? hwDiff * 20 : 0}px, ${needDiff ? hwDiff * -20 : 0}px, 0px)`,
                  `rotate3d(1, 1, 0, ${Math.floor(direction / 4) * 180}deg)`,
                  `rotate3d(0, 0, 1, -${direction % 4 * 90}deg)`,
                ].join(' '),
              }}
              data-direction={direction}
            >
              {flatten(
                item.map((s, r) => s.split('').map(
                  (_1, c) => (
                    <div
                      key={`${r}_${c}`}
                      className="SolutionViewCell"
                      style={item[r][c] === 'x' ? { backgroundColor: this.colors[i] } : {}}
                    />
                  )),
                ),
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

export default SolutionView