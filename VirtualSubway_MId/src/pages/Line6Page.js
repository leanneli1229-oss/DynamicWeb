import { TRAIN_DATA } from '../data/trainData'
import TrainInfoCard from '../components/TrainInfoCard'

function Line6Page() {

  const trainInfo = TRAIN_DATA[6]

  return <TrainInfoCard trainInfo={trainInfo} />
}

export default Line6Page