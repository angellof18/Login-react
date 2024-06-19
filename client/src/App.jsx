import { LoginDesktop } from "./Components/LoginDesktop"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignDesktop } from "./Components/SignDesktop"

function App() {

  return (
    <div className="background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginDesktop />} />
          <Route path="/sign" element={<SignDesktop />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
