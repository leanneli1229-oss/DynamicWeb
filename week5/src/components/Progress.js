
import React from 'react'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'


const Progress = (props) => {

  const { value = 0, rounded, showLabel, className, ...rest } = props


  const pct = Math.max(0, Math.min(100, Number(value) || 0))


  const trackClasses = twMerge(
    cx('relative w-full h-3 bg-gray-200 overflow-hidden', className, {
      'rounded-full': rounded,
      'rounded': !rounded,
    })
  )

  const barClasses = twMerge(
    cx('h-full bg-green-500', {
      'rounded-full': rounded,
      'rounded': !rounded,
    })
  )

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={trackClasses}
      {...rest}
    >
      <div
        className={barClasses}
        style={{
          width: `${pct}%`,

          backgroundImage:
            'linear-gradient(45deg, rgba(255,255,255,.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.25) 50%, rgba(255,255,255,.25) 75%, transparent 75%, transparent)',
          backgroundSize: '1rem 1rem'
        }}
      />

      {showLabel && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
          {pct}%
        </span>
      )}
    </div>
  )
}

export default Progress

