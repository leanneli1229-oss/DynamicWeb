import {useState} from 'react'
import Dropdown from '../components/Dropdown'

const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const DropdownPage = () => {
  // this is where we will store which option value was selected from our dropdown
  const [value, setValue] = useState(null)

  const handleChange = (option) => {
    setValue(option)
  }
  return (
    <div>
      <h1>Dropdown Page Currently Selected: {value?.value}</h1>
      <Dropdown options={OPTIONS} onChange={handleChange} />
    </div>
  )
}

export default DropdownPage
