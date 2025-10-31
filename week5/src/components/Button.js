import cx from 'classnames'
import PropTypes from 'prop-types'
import {twMerge} from 'tailwind-merge'

const Button = (props) => {
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    rounded,
    outline,
    ...otherProps
  } = props

  const count =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!success) +
    Number(!!warning) +
    Number(!!danger)

  if (count > 1) {
    console.warn(
      'You silly goose! Only one of primary, secondary, success, warning, danger can be TRUE!'
    )
  }

  const baseClass = 'flex items-center px-8 py-3 border'
  const classes = twMerge(
    cx(otherProps.className, baseClass, {
      'bg-blue-500 border-blue-500 text-white': primary,
      'bg-gray-900 border-gray-900 text-white': secondary,
      'bg-green-500 border-green-500 text-white': success,
      'bg-orange-400 border-orange-500 text-white': warning,
      'bg-red-600 border-red-600 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-orange-400': outline && warning,
      'text-red-600': outline && danger,
    })
  )

  return (
    <button {...otherProps} className={classes}>
      {children}
    </button>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  rounded: PropTypes.bool,
  outline: PropTypes.bool,
}

export default Button
