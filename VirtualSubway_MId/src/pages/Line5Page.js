import { TRAIN_DATA } from '../data/trainData'
import TrainInfoCard from '../components/TrainInfoCard'

function Line5Page() {

  const trainInfo = TRAIN_DATA[5]

  return <TrainInfoCard trainInfo={trainInfo} />
}

export default Line5Page