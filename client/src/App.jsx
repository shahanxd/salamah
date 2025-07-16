import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiMessage, setApiMessage] = useState('')
  const [dbStatus, setDbStatus] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        setApiMessage(data.message)
        setDbStatus(data.dbConnected ? 'MongoDB Connected' : 'MongoDB Not Connected')
      })
      .catch(() => {
        setApiMessage('API not reachable')
        setDbStatus('MongoDB status unknown')
      })
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, border: '1px solid #eee', borderRadius: 12, textAlign: 'center', background: '#fafafa' }}>
      <h1>Connection Test</h1>
      <p style={{ fontSize: 18, margin: '24px 0' }}>
        <strong>Backend:</strong> {apiMessage}
      </p>
      <p style={{ fontSize: 18, margin: '24px 0', color: dbStatus === 'MongoDB Connected' ? 'green' : 'red' }}>
        <strong>MongoDB:</strong> {dbStatus}
      </p>
      {(apiMessage === 'Hello from Express backend!' && dbStatus === 'MongoDB Connected') && (
        <div style={{ marginTop: 32, padding: 16, background: '#e0ffe0', borderRadius: 8, color: '#2e7d32', fontWeight: 'bold' }}>
          ✅ Frontend, Backend, and MongoDB are all connected perfectly!
        </div>
      )}
    </div>
  )
}

export default App
