import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import Home from './pages/Home/index.jsx'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ padding: 24, color: '#fff' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
