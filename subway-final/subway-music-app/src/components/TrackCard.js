import {useContext, useState} from 'react'
import AudioContext from '../context/AudioContext'
import {cn} from '../utils/cn'

export default function TrackCard({track}) {
  const {playTrack, currentTrack, isPlaying, pauseTrack} = useContext(AudioContext)
  const [isHovered, setIsHovered] = useState(false)

  const isCurrentTrack = currentTrack && currentTrack.id === track.id
  const shouldShowColor = isHovered || (isCurrentTrack && isPlaying)

  const handleClick = () => {
    if (isCurrentTrack && isPlaying) {
      pauseTrack()
    } else {
      playTrack(track)
    }
  }

  // FIX: Ensure the border is always 3px wide to prevent content shifting (responsive movement).
  // It's transparent when inactive and colored when active/hovered.
  const cardStyle = {
    backgroundColor: shouldShowColor ? track.lineColor : '#EFEFE7', // White background when inactive
    border: shouldShowColor 
      ? `3px solid ${track.lineColor}` // Visible color border when active
      : `3px solid transparent`,      // Invisible border when inactive (keeps size constant)
  }
  // No need for a custom rounding class since 'rounded-lg' can be applied directly to the class list

  return (
    <div className="w-full">
      <div 
        // Applying rounded-lg here makes the container rounded when the background color is set,
        // and we rely on the square ratio enforcement.
        className={cn(
          "relative overflow-hidden cursor-pointer w-full h-0 pt-[100%]",
          // Apply rounding only when shouldShowColor is true. 
          // We can't use cn with complex rounding logic, so let's stick to the previous dynamic approach or rely on the background fill.
          shouldShowColor ? 'rounded-2xl' : 'rounded-none'
        )}
        style={cardStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner Content: Fills the square container */}
        <div className="absolute inset-0 flex flex-col">
          
          {/* IMAGE CONTAINER: 65% of the square height */}
          <div className="pl-2 pr-2 pt-2 pt-2 w-full h-[65%] overflow-hidden"> 
            <img 
              src={track.imageUrl} 
              alt={track.stationName}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* TEXT CONTAINER: 35% of the square height */}
          <div className="pl-3 pt-12 h-[10%]"> 
            <h3 className={cn(
              "mb-0.3 text-1xl font-medium", 
              shouldShowColor ? "text-[#EFEFE7]" : "text-black"
            )}>
              {track.stationName}
            </h3>
            <p className={cn(
              "m-0 text-3xl italic font-medium font-serif",
              shouldShowColor ? "text-[#EFEFE7]" : "text-black"
            )}>
              {track.instrument}
            </p>
          </div>
        </div>

        {isCurrentTrack && isPlaying && (
          <div className="absolute bottom-3 right-2.5 px-1 py-1 text-2xl text-white">
            ❚❚
          </div>
        )}
      </div>
    </div>
  )
}