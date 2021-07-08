import React from 'react'
import './index.css'
import { puzzleVersion } from '../../solver'

class TypeSwitch extends React.PureComponent<{
  version: puzzleVersion,
  onChange: (version: puzzleVersion) => any,
}> {
  render() {
    const { version, onChange } = this.props
    return (
      <div className="TypeSwitch">
        <div
          className={`TypeSwitchItem ${version === 'V2' ? 'selected' : ''}`}
          onClick={() => onChange('V2')}
        >
          V2
          </div>
        <div
          className={`TypeSwitchItem ${version === 'V2Beta' ? 'selected' : ''}`}
          onClick={() => onChange('V2Beta')}
        >
          V2Beta
          </div>
      </div>
    )
  }
}
export default TypeSwitch