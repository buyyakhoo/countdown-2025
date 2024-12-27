import { useEffect, useRef, useState } from 'react'
import './App.css'

interface Time {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  percent: number,
  status: string
}

function App() {
  const newYearDate : Date = new Date('January 1, 2025 00:00:00')
  const timerId = useRef<number | null>(null)

  const [time, setTime] = useState<Time>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    percent: 100,
    status: ""
  })

  useEffect(() => {
    timerId.current = setInterval(() => {
      const now : any = new Date()
      const diffTime : number = newYearDate.getTime() - now.getTime()
      const diffSecond : number = Math.floor(diffTime / 1000)

      if (diffSecond < 0) {

        if (timerId.current !== null) {
          clearInterval(timerId.current)
        }
        
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          percent: 100,
          status: "Happy New Year 2025!"     
        })
      } else {
        setTime((prev) => ({
          days: Math.floor(diffSecond / 86400),
          hours: Math.floor((diffSecond % 86400) / 3600),
          minutes: Math.floor((diffSecond % 3600) / 60),
          seconds: Math.floor(diffSecond % 60),
          percent: Math.floor((100 - (diffSecond / (60 * 60 * 24 * 365) * 100))),
          status: prev.status
        }))
      }
    }, 1000)

    return () => {
      if (timerId.current !== null) {
        clearInterval(timerId.current);
      }
    };

  }, [newYearDate])


  return (
    <div className="App">
      <div className="container">
        <div className="headline-out">
            <div className="headline">
              <span className="title">Countdown-2025</span>
            </div>
            <div className="countdown">
              <li><span id="days">{time.days}</span>Days</li>
              <li><span id="hours">{(time.hours < 10) ? "0" + time.hours : time.hours}</span>Hours</li>
              <li><span id="mins">{(time.minutes < 10) ? "0" + time.minutes : time.minutes}</span>Minutes</li>
              <li><span id="secs">{(time.seconds < 10) ? "0" + time.seconds : time.seconds}</span>Seconds</li>
              <li><span id="proc">{time.percent}</span>Percent</li>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${time.percent}%`, backgroundColor: 'limegreen', height: '10px', borderRadius: '5px', transition: 'width 0.5s ease' }}></div>
            </div>
            <div className="headline">
              <span id="end">{ time.status }</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
