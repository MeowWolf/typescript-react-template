import React, { FunctionComponent, useContext, useEffect } from 'react'
import { Platform, PlatformInterfaceContext, GameStateContext } from '@meowwolf/react-platform-connection'

import { IInventoryItem } from './typings'

const App: FunctionComponent = () => {
  return (
    <Platform>
      <Ossilator />
    </Platform>
  )
}

const Ossilator: FunctionComponent = () => {
  const gameState = useContext(GameStateContext)
  const platformInterface = useContext(PlatformInterfaceContext)

  useEffect(() => {
    if (!gameState || !platformInterface || !gameState.user.properties.inventory) return
    if (gameState.user.properties.ossButtonsPressed) {
      const { upsertUserProperties } = platformInterface
      upsertUserProperties({
        uuid: gameState.user.uuid,
        properties: {
          ossButtonsPressed: false,
          inventory: {
            items: [
              ...gameState.user.properties.inventory.items.filter(
                (item: IInventoryItem) =>
                  item.title !== 'Depamina 1:3' &&
                  item.title !== 'Depamina 2:3' &&
                  item.title !== 'Depamina 3:3' &&
                  item.title !== 'Defragmented Depamina Memory',
              ),
              {
                title: 'Defragmented Depamina Memory',
                quantity: 1,
                icon: {
                  source: 'http://10.4.48.188:4001/icons/depamina-full.png',
                  name: 'depamina-full.png',
                },
                description: "This is Depamina's defragmented memory.",
              },
            ],
          },
        },
      })
      window.location.reload()
    }
  }, [gameState, platformInterface])

  return gameState && platformInterface ? (
    <div>User booped, but does not have ossButtonsPressed</div>
  ) : (
    <div>Waiting for boops</div>
  )
}

export default App
