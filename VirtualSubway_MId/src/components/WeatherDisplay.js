import { useState, useEffect } from 'react'
import axios from 'axios'

function WeatherDisplay({ city = 'New York', className }) {
  const [weather, setWeather] = useState(null)

useEffect(() => {

    axios.get(`https://wttr.in/${city}?format=j1`)
      .then(response => {

        setWeather(response.data)
        console.log('Weather data:', response.data)
      })
  }, [city])

  const getCurrentTemp = () => {
    if (weather && weather.current_condition && weather.current_condition[0]) {
      return weather.current_condition[0].temp_F
    }
    return '...'
  }

  const getCityName = () => {
    if (city === 'NewYork') return 'New York'
    return city
  }

  return (
    <div className={className}>
      <div className="text-xl font-bold">{getCityName()}</div>
      <div className="text-4xl font-bold">
        {getCurrentTemp()}°F
      </div>
    </div>
  )
}

export default WeatherDisplay