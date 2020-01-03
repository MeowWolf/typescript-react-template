import React, { FunctionComponent, useContext, useState, Fragment } from 'react'
import {
  Platform,
  GameStateContext,
  PlatformInterfaceContext,
  ConfigContext,
} from '@meowwolf/react-platform-connection'
import uuidv1 from 'uuid'

import { IInventoryItem } from './typings'
import './App.css'

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Platform>
        <SlimeControl />
      </Platform>
    </div>
  )
}

const SlimeControl: FunctionComponent = () => {
  const gameState = useContext(GameStateContext)
  const platformInterface = useContext(PlatformInterfaceContext)
  const config = useContext(ConfigContext)
  if (!platformInterface) return <Fragment>Waiting for boop at {config && config.projectCode}</Fragment>
  if (platformInterface && gameState && config) {
    const { upsertUserProperties } = platformInterface
    const oldInventoryItems = gameState.user.properties.inventory ? gameState.user.properties.inventory.items : []
    switch (config.projectCode) {
      case 'dmsl01-slime1':
        upsertUserProperties({
          uuid: gameState.user.uuid,
          properties: {
            inventory: {
              items: [
                ...oldInventoryItems.filter((item: IInventoryItem) => item.title !== 'Depamina 1:3'),
                {
                  uuid: uuidv1(),
                  title: 'Depamina 1:3',
                  icon: {
                    name: 'pam-memory-1.png',
                    source: 'images/icons/pam-memory-1.png',
                  },
                  quantity: 1,
                  description: "Depamina's hair",
                },
              ],
            },
          },
        })
        window.location.reload()
        break
      case 'dmsl02-slime2':
        upsertUserProperties({
          uuid: gameState.user.uuid,
          properties: {
            inventory: {
              items: [
                ...oldInventoryItems.filter((item: IInventoryItem) => item.title !== 'Depamina 2:3'),
                {
                  uuid: uuidv1(),
                  title: 'Depamina 2:3',
                  icon: {
                    name: 'pam-memory-2.png',
                    source: 'images/icons/pam-memory-2.png',
                  },
                  quantity: 1,
                  description: "Depamina's Right Eye",
                },
              ],
            },
          },
        })
        window.location.reload()
        break
      case 'dmsl03-slime3':
        upsertUserProperties({
          uuid: gameState.user.uuid,
          properties: {
            inventory: {
              items: [
                ...oldInventoryItems.filter((item: IInventoryItem) => item.title !== 'Childhood Toy'),
                {
                  uuid: uuidv1(),
                  title: 'Childhood Toy',
                  icon: {
                    name: 'boy-with-ball.png',
                    source: 'images/icons/boy-with-ball.png',
                  },
                  quantity: 1,
                  description: '',
                },
              ],
            },
          },
        })
        window.location.reload()
        break
      case 'resistance-computer':
        upsertUserProperties({
          uuid: gameState.user.uuid,
          properties: {
            inventory: {
              items: [
                {
                  uuid: uuidv1(),
                  title: 'Pam Memory 1 of 3',
                  icon: {
                    name: 'pam-memory-1.png',
                    source: 'images/icons/pam-memory-1.png',
                  },
                  quantity: 1,
                  description: "This is Pam's eyes I guess",
                },
                {
                  uuid: uuidv1(),
                  title: 'Pam Memory 2 of 3',
                  icon: {
                    name: 'pam-memory-2.png',
                    source: 'images/icons/pam-memory-2.png',
                  },
                  quantity: 1,
                  description: "I think this is Pam's ear?",
                },
                {
                  uuid: uuidv1(),
                  title: 'Pam Memory 3 of 3',
                  icon: {
                    name: 'pam-memory-3.png',
                    source: 'images/icons/pam-memory-3.png',
                  },
                  quantity: 1,
                  description: "Pam's mouth. Weird.",
                },
              ],
            },
          },
        })
        window.location.reload()
        break
      case 'dcom-charlies':
        upsertUserProperties({
          uuid: gameState.user.uuid,
          properties: {
            inventory: {
              items: [
                ...gameState.user.properties.inventory.items.filter(
                  (item: IInventoryItem) => item.title !== 'Boy With Ball',
                ),
                {
                  uuid: uuidv1(),
                  title: 'Boy With Ball',
                  icon: {
                    name: 'boy-with-ball.png',
                    source: 'images/icons/boy-with-ball.png',
                  },
                  quantity: 1,
                  description: 'This boy has a red ball',
                },
              ],
            },
          },
        })
        window.location.reload()
        break
      default:
        console.log('did nothing as we received a boop from something we dont care about')
    }
  }

  return gameState ? (
    <Fragment>
      <h1>{gameState.user.uuid}</h1>
      {!gameState.user.properties.inventory && <h2>Current user has no inventory</h2>}
      {gameState.user.properties.inventory && gameState.user.properties.inventory.items && (
        <ul>
          {gameState.user.properties.inventory.items.map((item: IInventoryItem) => (
            <li>
              <ul>
                <li>
                  <strong>{item.title}</strong>
                </li>
                <li>{item.description}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  ) : (
    <Fragment>Wating for boop at {config && config.projectCode}</Fragment>
  )
}

export default App
