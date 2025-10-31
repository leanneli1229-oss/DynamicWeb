import { TRAIN_DATA } from '../data/trainData'
import TrainInfoCard from '../components/TrainInfoCard'

function Line4Page() {

  const trainInfo = TRAIN_DATA[4]

  return <TrainInfoCard trainInfo={trainInfo} />
}

export default Line4Page