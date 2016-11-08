import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import app from '../src/app'
import { routerMiddleware } from 'react-router-redux'

export default function createStore(history, client, data)