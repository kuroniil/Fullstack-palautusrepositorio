import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './components/countryinfo.jsx'

const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const names = []
          for (let index in response.data) {
            names.push(response.data[index].name.common)
          }
          const updatedCountries = names.filter(name => name.toLowerCase().includes(country.toLowerCase()))
          setCountries(updatedCountries)
          
          if (updatedCountries.length === 1) {
            const targetCountry = updatedCountries[0]
            for (let index in response.data) {
              if (response.data[index].name.common == targetCountry) {
                const updatedData = response.data[index]                
                setCountryData(updatedData)
                break    
              }
            }
          }
        })
    }
  }, [country])


  const changeValue = (country) => {
    setCountry(country)
  }

  const handleChange = (event) => {
    const updatedValue = event.target.value
    setValue(updatedValue)
    setCountry(updatedValue)
  }
  if (countryData.length === 0 && 0 < countries.length < 10) {
  return (
    <div>
        find countries <input value={value} onChange={handleChange} />
      <pre>
        {country}
        {countries.map(country => <p>{country} <button onClick={() => changeValue(country)}>show</button></p>)}
      </pre>
      <div>
      </div>
    </div>
  )
} else if (countries.length > 10) {
  return (
    <div>
        find countries <input value={value} onChange={handleChange} />
        <p>Too many matches, specify another filter</p>
    </div>
  )
} else {
    if (countryData.name.common.toLowerCase().includes(country.toLowerCase())) {
    return (
      <div>
          find countries <input value={value} onChange={handleChange} />
        <pre>
          {countries.map(country => <p>{country} <button onClick={() => changeValue(country)}>show</button></p>)}
          <CountryInfo countryData={countryData}/>
        </pre>
        <div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
          find countries <input value={value} onChange={handleChange} />
          {countries.map(country => <p>{country} <button onClick={() => changeValue(country)}>show</button></p>)}
          {countries}
        <div>
        </div>
      </div>
    )
  }
  }
}
export default App