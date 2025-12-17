import {Link, useLocation} from 'react-router-dom'
import {cn} from '../utils/cn'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed top-10 right-5 flex gap-4 z-50">
      <Link
        to="/"
        className={cn(
          "px-5 py-2.5 rounded-2xl text-base transition-all no-underline",
          isActive('/') 
            ? "bg-black text-white" 
            : "bg-[#eeeee7] text-black hover:bg-gray-100"
        )}
      >
        Map
      </Link>
      <Link
        to="/archived"
        className={cn(
          "px-5 py-2.5 rounded-2xl text-base transition-all no-underline",
          isActive('/archived') 
            ? "bg-black text-white" 
            : "bg-[#EFEFE7] text-black hover:bg-gray-100"
        )}
      >
        Archived
      </Link>
      <Link
        to="/info"
        className={cn(
          "px-5 py-2.5 rounded-2xl text-base transition-all no-underline",
          isActive('/info') 
            ? "bg-black text-white" 
            : "bg-[#EFEFE7] text-black hover:bg-gray-100"
        )}
      >
        ?
      </Link>
    </nav>
  )
}