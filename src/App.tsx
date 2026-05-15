import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import JsonFormatter from './pages/JsonFormatter'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tools/json-formatter" element={<JsonFormatter />} />
    </Routes>
  )
}
