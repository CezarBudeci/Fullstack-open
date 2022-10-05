import { useState } from 'react';
import Feedback from './components/feedback';
import Statistics from './components/statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const buttons = ['good', 'neutral', 'bad'];

  const handleClick = (e) => {
    switch (e.target.id) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
    }
  }

  return (
    <div>
      <Feedback handleClick = {handleClick} buttons = {buttons} />
      {
        good || neutral || bad ? <Statistics good = {good} neutral = {neutral} bad = {bad} /> : <p>No feedback given</p>
      }
      
    </div>
  )
}

export default App