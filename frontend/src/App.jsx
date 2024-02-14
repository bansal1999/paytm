import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/Dashboard" element = {<Dashboard/>} />
        <Route path="/Sendmoney" element = {<SendMoney/>} />

      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
