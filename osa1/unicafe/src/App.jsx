import { useState } from 'react'
const Statistics = (props) =>  {
  if (props.stats.all != 0) {
    return (
      <table>
        <h1>Statistics</h1>
          <StatisticLine text="good" value={props.stats.good} />  
          <StatisticLine text="neutral" value={props.stats.neutral} />  
          <StatisticLine text="bad" value={props.stats.bad} />  
          <StatisticLine text="average" value={props.stats.average} />  
          <StatisticLine text="positive" value={props.stats.positive*100} end="%"/>
        </table>)
  } else {
      return (
      <div>
        <h1>Statistics</h1>
        <br></br>
        No feedback given
        </div>
      )
    }
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.end}</td>
      </tr>
  )
}

const Button = (props) => {
  return (<button onClick={props.function}>{props.name}</button>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [sum, setSum] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + bad + neutral)
    const updatedSum = sum + 1
    setSum(updatedSum)
    const updatedAll = (updatedGood + bad + neutral)
    setAverage(updatedSum / updatedAll)
    setPositive(updatedGood / updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + bad + updatedNeutral)
    const updatedAll = (updatedNeutral + bad + good)
    setAverage(sum / updatedAll)
    setPositive(good / updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)  
    setAll(updatedBad + good + neutral)
    const updatedSum = sum - 1
    setSum(updatedSum)
    const updatedAll = (updatedBad + good + neutral)
    setAverage(updatedSum / updatedAll)
    setPositive(good / updatedAll)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button function={handleGoodClick} name={"good"}/>
      <Button function={handleNeutralClick} name={"neutral"}/>
      <Button function={handleBadClick} name={"bad"}/>
    <div>
        <Statistics stats={{good: good, bad:bad, neutral:neutral, average:average, positive:positive, all:all}} />
    </div>
    </div>
  )
}

export default App