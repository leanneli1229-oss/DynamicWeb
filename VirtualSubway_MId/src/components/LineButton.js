import { twMerge } from 'tailwind-merge'

function LineButton({ icon, onClick, className }) {

  return (
    <img 
      src={icon}
      alt="Subway Line"
      onClick={onClick}
      className={twMerge(
        "w-72 h-72 cursor-pointer transition-transform duration-200 hover:scale-105",
        className
      )}
    />
  )
}

export default LineButton