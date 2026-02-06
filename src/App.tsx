import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Inventory from "./pages/Inventory"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
