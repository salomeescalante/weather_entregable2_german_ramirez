import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './assets/components/CardWeather'
import LoadingScreen from './assets/components/LoadingScreen'


function App() {

  const [coords, setCoords] = useState()


  useEffect(() => {

    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (

    <div className="App">

      <CardWeather lon={coords?.lon} lat={coords?.lat} />

    </div>

  )
}

export default App
