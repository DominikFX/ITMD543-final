import { Link, useNavigate } from 'react-router-dom'

type Props = { onAddClick?: () => void }

export default function Navbar({ onAddClick }: Props) {
  const nav = useNavigate()
  return (
    <header className="nav">
      <div className="nav__inner">
        <button className="brand" onClick={() => nav('/')}>Wireless Mic Vault</button>
        <nav className="nav__links">
          <Link to="/inventory" className="nav__link">Inventory</Link>
          <Link to="/frequencies" className="nav__link">Frequencies</Link>
          <button className="btn btn--primary" onClick={onAddClick}>Add Mic</button>
        </nav>
      </div>
    </header>
  )
}