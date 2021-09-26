import React from 'react'
import './index.css'
import { range } from 'lodash'
import { puzzleVersion } from '../../solver'
import {problem} from '../../problem'


class Calendar extends React.PureComponent<{
  version: puzzleVersion,
  month: number,
  day: number,
  week: number,
  onChange: (params: { month: number, day: number, week: number }) => any
}> {
  weekNames = [
    'Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat',
  ]

  render() {
    const { version, month, day, week, onChange } = this.props
    const monthNames = problem[version].month_names
    return (
      <div className="Calendar">
        <>
          {range(0, 6).map(m => (
            <div
              className={`item month ${month === m ? 'selected' : ''}`}
              key={m}
              onClick={() => onChange({ month: m, day, week })}
            >
              {monthNames[m]}
            </div>
          ))}
          <div className="item empty" />
          {range(6, 12).map(m => (
            <div
              className={`item month ${month === m ? 'selected' : ''}`}
              key={m}
              onClick={() => onChange({ month: m, day, week })}
            >
              {monthNames[m]}
            </div>
          ))}
          <div className="item empty" />
        </>
        {version === "V2Beta" ? <>{range(0, 7).map(w => (
          <div
            className={`item week ${week === w ? 'selected' : ''}`}
            key={w}
            onClick={() => onChange({ month, day, week: w })}
          >
            {this.weekNames[w]}
          </div>
        ))}</> : null}
        {range(1, 32).map(d => (
          <div
            className={`item ${day === d ? 'selected' : ''}`}
            key={d}
            onClick={() => onChange({ month, day: d, week })}
          >
            {d}
          </div>
        ))}
        {version === 'V2' ? <>
          {range(0, 4).map(w => (
            <div
              className={`item week ${week === w ? 'selected' : ''}`}
              key={w}
              onClick={() => onChange({ month, day, week: w })}
            >
              {this.weekNames[w]}
            </div>
          ))}
          <div className="item empty" />
          <div className="item empty" />
          <div className="item empty" />
          <div className="item empty" />
          {range(4, 7).map(w => (
            <div
              className={`item week ${week === w ? 'selected' : ''}`}
              key={w}
              onClick={() => onChange({ month, day, week: w })}
            >
              {this.weekNames[w]}
            </div>
          ))}
        </>
          : null}
      </div>
    )
  }
}

export default Calendar