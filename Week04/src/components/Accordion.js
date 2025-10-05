import {useState} from 'react'
import {GoChevronDown} from 'react-icons/go'
import {GoChevronUp} from 'react-icons/go'

const Accordion = (props) => {
  const {items} = props

  const [expandedIndex, setExpandedIndex] = useState(-1)

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1
      } else {
        return nextIndex
      }
    })
  }

  const renderedItems = items.map((item, index) => {
    // logic stuff here
    const isExpanded = index === expandedIndex

    //conditional icon render using a ternary
    // condition to check ? what to return if true : what to return if false
    const icon = (
      <span className="text-2xl">
        {isExpanded ? <GoChevronDown /> : <GoChevronUp />}
      </span>
    )

    //return jsx here
    return (
      <div key={item.id}>
        <div
          onClick={() => handleClick(index)}
          className="flex justify-between items-center p-3 bg-gray-100 border-b cursor-pointer"
        >
          {item.label}
          {icon}
        </div>
        {/* // conditional content div based on if index of item === expanded index from state */}
        {isExpanded && <div className="border-b p-5">{item.content}</div>}
      </div>
    )
  })

  return <div>{renderedItems}</div>
}

export default Accordion
