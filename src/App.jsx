
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/authent/login/LoginPage'
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path="student/*" element={<StudentPage />} />
      </Routes>
    </>
  )
}

export default App
