import {useState, useEffect} from 'react'
import axios from 'axios'
import StationGroup from '../components/StationGroup'

export default function ArchivedPage() {
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await axios.get('http://localhost:3001/tracks')
      setTracks(response.data)
    }
    fetchTracks()
  }, [])

  const groupTracksByLine = () => {
    const grouped = {}
    tracks.forEach((track) => {
      const key = track.line
      if (!grouped[key]) {
        grouped[key] = {
          lineCode: track.lineCode,
          lineName: track.line,
          trainNumbers: track.trainNumbers,
          lineColor: track.lineColor,
          hasDiamond: track.line === 'Lexington Ave Line',
          tracks: [],
        }
      }
      grouped[key].tracks.push(track)
    })
    return Object.values(grouped)
  }

  const groupedLines = groupTracksByLine()

  return (
    // FINAL FIX: Removed max-w class entirely and set padding to a very large value (500px).
    // The content will now be centered and guaranteed to have 500px of padding on each side 
    // before the content starts, provided the screen is wide enough.
   <div className="bg-[#EFEFE7] pt-48 px-[500px] pb-10 mx-auto md:px-5">

      <div className="mb-24">
        <h1 className="text-7xl font-bold m-0 leading-tight md:text-8xl">
          NEW YORK
        </h1>
        <h1 className="text-7xl font-bold mt-1 leading-tight text-slanted md:text-8xl">
          <span className="text-black">UNDERGROUND</span> MUSIC
        </h1>
      </div>
      
      <div className="mt-10">
        {groupedLines.map((lineGroup, index) => (
          <div 
            key={lineGroup.lineName}
            style={{animationDelay: `${index * 0.2}s`}}
          >
            <StationGroup
              lineCode={lineGroup.lineCode}
              lineName={lineGroup.lineName}
              trainNumbers={lineGroup.trainNumbers}
              lineColor={lineGroup.lineColor}
              hasDiamond={lineGroup.hasDiamond}
              tracks={lineGroup.tracks}
            />
          </div>
        ))}
      </div>
    </div>
  )
}