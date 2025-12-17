import TrackCard from './TrackCard'

export default function StationGroup({lineCode, lineName, trainNumbers, lineColor, tracks, hasDiamond}) {
  return (
    // Grid fix: md:grid-cols-4 for Line Info (1) + Track Cards (3)
    <div className="mb-10 grid grid-cols-1 gap-6 fade-in-up md:grid-cols-4">
      
      {/* Column 1 - Line Info (1 column wide) */}
      <div className="flex flex-col w-full">
        
        {/* MODIFICATION: Changed bg-white to bg-gray-100 */}
        <div className=" py-1 px-0 font-medium text-2xl text-left w-full mt-3">
          {/* Inner div maintains left alignment and padding */}
          <div className="px-1">
              {lineCode} 
          </div>
        </div>
        
        <div
  className="font-medium text-4xl text-left w-full tracking-tight"
  
>
  <div className="px-0 pt-2">
    {lineName}
  </div>
</div>

        <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-4 w-full">
          {trainNumbers.map((num) => (
            <div
              key={num}
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-4xl"
              style={{backgroundColor: lineColor}}
            >
              {num}
            </div>
          ))}
        </div>
       
      </div>
      
      {/* Columns 2, 3, 4 - Track Cards (3 total) */}
      {tracks.slice(0, 3).map((track) => (
        <div key={track.id} className="w-full">
          <TrackCard track={track} />
        </div>
      ))}
      
      {/* Divider spans all 4 columns */}
      <div className="h-px bg-black mt-6 mb-1 md:col-span-4"></div>

    </div>
  )
}