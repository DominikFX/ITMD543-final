import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Inventory from './components/Inventory'
import Frequencies from './components/Frequencies'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/Frequencies" element={<Frequencies />} />
    </Routes>
  )
}