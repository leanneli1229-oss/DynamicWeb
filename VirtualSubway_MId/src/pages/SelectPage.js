import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import LineButton from '../components/LineButton'
import icon4 from '../assets/4.png'
import icon5 from '../assets/5.png'
import icon6 from '../assets/6.png'

function SelectPage() {
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState('green')

const handleLineClick = (lineNumber) => {
  if (lineNumber === 4) {
    navigate('/line4')
  } else if (lineNumber === 5) {
    navigate('/line5')
  } else if (lineNumber === 6) {
    navigate('/line6')
  }
}

  const handleColorClick = (color) => {
    setSelectedColor(color)
  }

  return (
    <div className="min-h-screen bg-green-600 flex flex-col p-8">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => handleColorClick('green')}
          className={twMerge(
            "px-6 py-3 font-bold rounded-lg transition-all",
            selectedColor === 'green' 
              ? "bg-green-700 text-white" 
              : "bg-white text-green-600"
          )}
        >
          Green
        </button>
        <button
          onClick={() => handleColorClick('red')}
          className={twMerge(
            "px-6 py-3 font-bold rounded-lg transition-all",
            selectedColor === 'red' 
              ? "bg-red-600 text-white" 
              : "bg-white text-red-600"
          )}
        >
          Red
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {selectedColor === 'green' && (
          <>
            <div className="flex gap-12 mb-20">
        <LineButton 
        icon={icon4}
        onClick={() => handleLineClick(4)} 
         />
        <LineButton 
        icon={icon6}
        onClick={() => handleLineClick(6)} 
        />
        <LineButton 
        icon={icon5}
        onClick={() => handleLineClick(5)}
        />
            </div>
            <h2 className="text-white text-5xl font-bold text-center">
              Explore the Virtual Subway Train 🚇
            </h2>
          </>
        )}

        {selectedColor === 'red' && (
          <div className="text-center">
            <h2 className="text-white text-6xl font-bold mb-4">
              🚧 Under Construction 🚧
            </h2>
            <p className="text-white text-2xl">
              This line is currently unavailable
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectPage