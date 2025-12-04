import { Link, useNavigate } from 'react-router-dom'

type Props = { onAddClick?: () => void }

export default function Navbar({ onAddClick }: Props) {
  const nav = useNavigate()
  const linkStyle = "text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1100px] w-[92%] mx-auto h-16 flex items-center justify-between">
        <button className="font-bold text-lg text-white cursor-pointer" onClick={() => nav('/')}>
          Wireless Mic Vault
        </button>
        <nav className="flex gap-2 items-center">
          <Link to="/" className={linkStyle}>Home</Link>
          <Link to="/inventory" className={linkStyle}>Inventory</Link>
          <Link to="/frequencies" className={linkStyle}>Frequencies</Link>  
          <button className="ml-2 bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold hover:brightness-95 cursor-pointer border border-gray-200" onClick={onAddClick}>Add Mic</button>
        </nav>
      </div>
    </header>
  )
}