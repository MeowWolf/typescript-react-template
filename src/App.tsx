import React, { FunctionComponent, useContext, useEffect } from 'react'
import { Platform, ConfigContext } from '@meowwolf/react-platform-connection'

const App: FunctionComponent = () => {
  return (
    <Platform>
      <Tester />
    </Platform>
  )
}

const Tester: FunctionComponent = () => {
  const config = useContext(ConfigContext)
  useEffect(() => {
    console.log(config)
  }, [config])
  return <p>Loaded Config. Things seem good to go.</p>
}

export default App
