import {useState, useEffect, useRef} from 'react'

import {GoChevronDown} from 'react-icons/go'
import Panel from './Panel'

const Dropdown = (props) => {
  const {options, onChange, value} = props

  const [isOpen, setIsOpen] = useState(false)

  const divEl = useRef()

  useEffect(() => {
    const handler = (event) => {
      if (divEl.current && !divEl.current.contains(event.target)) {
        setIsOpen(false)
        console.log('clicked outside dropdown')
      }
    }
    document.addEventListener('click', handler, true)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [divEl])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setIsOpen(false)
    onChange(option)
  }

  const renderedOptions = options.map((opt, index) => {
    return (
      <div
        onClick={() => handleOptionClick(opt)}
        key={index}
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
      >
        {opt.label}
      </div>
    )
  })

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        {value ? value.label : 'Select...'} <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  )
}

export default Dropdown
