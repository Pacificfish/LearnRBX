export default function TestApp() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>✅ React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}

