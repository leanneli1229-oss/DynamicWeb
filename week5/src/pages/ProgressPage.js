import React, { useState } from 'react'
import Progress from '../components/Progress'

const ProgressPage = () => {
  const [val, setVal] = useState()

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-xl font-semibold">Progress</h1>

      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-2 text-sm text-gray-700">Value: {val}%</div>
      </div>

      <Progress value={val} rounded showLabel className="w-full" />
      <Progress value={val} success rounded className="w-full" />
      <Progress value={val} warning className="w-full" />
      <Progress value={val} danger className="w-full" />
      <Progress value={val} secondary className="w-full" />
    </div>
  )
}

export default ProgressPage
