import React from 'react'
//import ButtonPage from './pages/ButtonPage'
//import AccordionPage from './pages/AccordionPage'
//import DropdownPage from './pages/DropdownPage'
import Progress from './components/Progress'
import ProgressPage from './pages/ProgressPage'

const App = () => {
  return (
    <div>
      <Progress value={50} showLabel className="w-1/2 mx-auto mt-[400px]" />
    </div>
  )
}

export default App
