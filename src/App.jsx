
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/authent/login/LoginPage'
import Dashboard from './components/dashboard/student/StudenPage' 
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path="student/*" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
