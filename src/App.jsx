
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/authent/login/LoginPage'
function App() {


  return (
    <>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
      </Routes>
    </>
  )
}

export default App
