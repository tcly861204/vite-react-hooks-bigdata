import React from 'react'
import PropTypes from 'prop-types'
import './checkstyle.scss'
const Checkbox = (props) => {
  const { value, callback } = props
  return (
    <label className={['cui_checkbox', value && 'is-checked'].join(' ')}>
      <span
        onClick={(e) => {
          callback && typeof callback === 'function' && callback()
          e.preventDefault()
        }}
        className={['cui_checkbox__input', value && 'is-checked'].join(' ')}
      >
        <span className="cui_checkbox__inner"></span>
        <input
          type="checkbox"
          aria-hidden="false"
          className="cui_checkbox__original"
        />
      </span>
    </label>
  )
}
Checkbox.propTypes = {
  value: PropTypes.bool,
  callback: PropTypes.func,
}
export default Checkbox
