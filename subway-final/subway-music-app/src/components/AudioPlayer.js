import {useContext, useEffect} from 'react'
import AudioContext from '../context/AudioContext'
import {cn} from '../utils/cn'

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    closePlayer,
    setCurrentTime,
    setDuration,
    setIsPlaying,
  } = useContext(AudioContext)

  // 1) Attach listeners once the <audio> exists
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioRef, setCurrentTime, setDuration, setIsPlaying])

  // 2) Play / pause whenever state changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return
    const audio = audioRef.current

    if (isPlaying) {
      audio
        .play()
        .catch((err) => {
          console.error('Audio play error:', err)
          setIsPlaying(false)
        })
    } else {
      audio.pause()
    }
  }, [audioRef, isPlaying, currentTrack, setIsPlaying])

  const formatTime = (time) => {
    if (time == null || Number.isNaN(time)) return '00:00:00'
    const t = Math.max(0, Math.floor(time))
    const hours = Math.floor(t / 3600)
    const minutes = Math.floor((t % 3600) / 60)
    const seconds = t % 60
    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0')
    )
  }

  if (!currentTrack) return null

  return (
    <div className="fixed top-10 left-5 bg-[#EFEFE7] px-5 py-2.5 rounded-2xl z-50">
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            'w-3 h-3 rounded-full bg-[#00933c]',
            isPlaying && 'blinking'
          )}
        />
        <div className=" text-xl text-gray-800">
          {formatTime(currentTime)}/{formatTime(duration)}
        </div>
        <button
          className="pl-8 mb-2 w-6 h-6 flex items-center justify-center text-3xl text-gray-600 hover:text-black cursor-pointer border-none bg-transparent"
          onClick={closePlayer}
        >
          ×
        </button>
      </div>
      <div className="pl-6 mt-0 text-sm font-medium text-black mt-1">
        {currentTrack.stationName}
      </div>

      {/* Let React update src for each track */}
      <audio ref={audioRef} src={currentTrack.audioUrl} preload="metadata" />
    </div>
  )
}

