import axios from 'axios'
import React, { useEffect, useState, } from "react"
import LoadingScreen from './LoadingScreen'


const CardWeather = ({ lat, lon }) => {

  const [weather, setWeather] = useState()
  const [temperture, setTemperture] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setisLoading] = useState(true)
  

  useEffect(() => {
    if (lat) {
      const APIKey = '84875e4337eca46ea281e21bc8d75400'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}
            `
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15) } °C`,
            farenheit: `${Math.round((res.data.main.temp -273.15) * 9 / 5 + 32)} °F`
          }
          
          setTemperture(temp)
          setisLoading(false)
         
    })
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather);

  const handleClick = () => setIsCelsius(!isCelsius)

  if(isLoading){
    return <LoadingScreen />
  } else {
    return (
      <article className='container'>
      <h1 className='title_App'>Weather App</h1>
      <h2 className='name'>{`${weather?.name}, ${weather?.sys.country} `}</h2>
      <div className='icon__weather'>

        <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />

        <div>
          <h3 className='description'>&#34;{weather?.weather[0].description}&#34;</h3>
          <ul className='broken'>
          <li><img src="./public/wind_icon.png" alt="Wind speed" /><span>  Wind Speed:   </span>{weather?.wind.speed}m/s</li>
            <li><img src="./public/clouds_icon.png" alt="Clouds" /><span>  Clouds:       </span>{weather?.clouds.all}%</li>
            <li><img src="./public/pressure_icon.png" alt="Pressure" /><span>  Pressure: </span>{weather?.main.pressure} hPa</li>
          </ul>

        </div>
      </div>

      <h2 className='temperture_date'>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
      <button className='temperture_btn' onClick={handleClick}>{isCelsius ? 'Change to °F': 'Change to °C'}</button>

    </article>
    )
  }

 
}

export default CardWeather
