import React, { useContext } from 'react'

import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import Log from '../components/Log'
import NewPostForm from '../components/Post/NewPostForm'
import { UidContext } from '../components/AppContext'

const Main = () => {
  const uid = useContext(UidContext)

  return (
    <div id="main">
      <LeftNav />
      <div className="main-header">
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
      </div>
      <Thread />
    </div>
  )
}
export default Main
