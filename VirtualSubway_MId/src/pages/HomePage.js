import { useNavigate } from 'react-router-dom'
import signImage from '../assets/sign.png'
import WeatherDisplay from '../components/WeatherDisplay'

function HomePage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/select')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      <WeatherDisplay 
        city="NewYork"
        className="absolute top-8 right-8 text-white text-right"
      />

      <img 
        src={signImage} 
        onClick={handleClick}
        className="cursor-pointer max-w-4xl w-full h-auto"
      />
    </div>
  )
}

export default HomePage