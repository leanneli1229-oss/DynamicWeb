import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AudioProvider} from './context/AudioContext'
import AudioPlayer from './components/AudioPlayer'
import Navigation from './components/Navigation'
import MapPage from './pages/MapPage'
import ArchivedPage from './pages/ArchivedPage'
import InfoPage from './pages/InfoPage'

function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <div className="bg-[#EFEFE7] min-h-screen">
          <div className="fixed top-0 left-0 w-full h-3 bg-black z-50"></div>
          <AudioPlayer />
          <Navigation />
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </div>
      </AudioProvider>
    </BrowserRouter>
  )
}

export default App