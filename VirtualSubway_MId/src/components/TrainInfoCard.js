import { twMerge } from 'tailwind-merge'

function TrainInfoCard({ trainInfo }) {
  const { icon, title, description, route, mood } = trainInfo

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center p-8">
      <div className={twMerge(
        "bg-gray-100 rounded-3xl p-12 max-w-2xl w-full shadow-2xl"
      )}>

        <div className="flex justify-center mb-6">
          <img 
            src={icon} 
            className="w-24 h-24"
          />
        </div>


        <h1 className="text-3xl font-bold text-center mb-8 border-b-2 border-green-600 pb-6">
          {title}
        </h1>


        <p className="text-lg italic text-center mb-8 leading-relaxed">
          {description}
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-center mb-2">Route</h2>
          <p className="text-green-600 text-center font-medium">
            {route}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center mb-2">Mood</h2>
          <p className="text-green-600 text-center font-medium">
            {mood}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrainInfoCard