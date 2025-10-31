import {useState} from 'react'
import Dropdown from '../components/Dropdown'
const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const COLOR_MAP = {
  red: 'bg-red-500',
  green: 'bg-green-400',
  blue: 'bg-blue-500',
}


const DATA_TO_FILTER = [
  {id: 1, name: 'katie', team: 'red'},
  {id: 2, name: 'tony', team: 'green'},
  {id: 3, name: 'amy', team: 'blue'},
  {id: 4, name: 'andy', team: 'red'},
  {id: 5, name: 'pete', team: 'green'},
]

const DropdownPage = () => {

  const [value, setValue] = useState(null)

  let filteredData = DATA_TO_FILTER

  if (value?.value) {
    filteredData = DATA_TO_FILTER.filter(
      (student) => student.team === value.value
    )
  }

  const handleChange = (option) => {
    setValue(option)
  }

  return (
    <div>
      <h1 className={COLOR_MAP[value?.value] || null}>
        Dropdown page with user selectd value of: {value?.label}
      </h1>
      <Dropdown options={OPTIONS} onChange={handleChange} value={value} />
      <h2 className={COLOR_MAP[value?.value]}>Students from {value?.label}:</h2>
      {filteredData.map((student) => {
        return <p key={student.id}>{student.name}</p>
      })}
    </div>
  )
}

export default DropdownPage
