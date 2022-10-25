import React, { useContext } from 'react'
import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import Main from './Main'

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <div className="home">
      <div className="log-container">
        {uid ? (
          <div>
            <Main />
          </div>
        ) : (
          <Log signin={false} signup={true} />
        )}
      </div>
    </div>
  )
}
export default Home
