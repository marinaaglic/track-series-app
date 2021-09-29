import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App';
import '../src/index.css'
import AuthProvider from './context/AuthContext';
	
ReactDOM.render(<AuthProvider><App /></AuthProvider>,document.getElementById('root'))
