import React from 'react'
import '../TypeSwitch/index.css'

class FlipSwitch extends React.PureComponent<{
  flipEnable: boolean,
  onChange: (flipEnable: boolean) => any,
}> {
  render() {
    const { flipEnable, onChange } = this.props
    return (
      <div className="TypeSwitch">
        <div
          className={`TypeSwitchItem ${flipEnable === false ? 'selected' : ''}`}
          onClick={() => onChange(false)}
        >
          磨砂
          </div>
        <div
          className={`TypeSwitchItem ${flipEnable === true ? 'selected' : ''}`}
          onClick={() => onChange(true)}
        >
          双面
          </div>
      </div>
    )
  }
}

export default FlipSwitch