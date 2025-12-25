import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

console.log('Hey fellow dev, hope you like the pixels!')

const root = createRoot(document.getElementById('root'))
root.render(<App />)
