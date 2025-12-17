// src/context/AudioContext.js

import { createContext, useState, useRef } from 'react'

const AudioContext = createContext()

function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // shared <audio> element ref (owned/used by AudioPlayer)
  const audioRef = useRef(null)

  // Start a new track (or restart the same one)
  const playTrack = (track) => {
    // set which track is active
    setCurrentTrack(track)

    // reset timing state
    setCurrentTime(0)
    setDuration(0)

    // tell the player it should be playing
    setIsPlaying(true)

    // optional: make sure any currently loaded audio is reset
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  // Pause the current track
  const pauseTrack = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  // Close the player and stop everything
  const closePlayer = () => {
    setCurrentTrack(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const valuesToShare = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    playTrack,
    pauseTrack,
    closePlayer,
    setCurrentTime,
    setDuration,
    setIsPlaying,
  }

  return (
    <AudioContext.Provider value={valuesToShare}>
      {children}
    </AudioContext.Provider>
  )
}

export { AudioProvider }
export default AudioContext


