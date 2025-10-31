import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SelectPage from './pages/SelectPage'
import Line4Page from './pages/Line4Page'
import Line5Page from './pages/Line5Page'
import Line6Page from './pages/Line6Page'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<SelectPage />} />

        <Route path="/line4" element={<Line4Page />} />
        <Route path="/line5" element={<Line5Page />} />
        <Route path="/line6" element={<Line6Page />} />
      </Routes>
    </div>
  )
}

export default App
