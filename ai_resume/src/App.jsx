import './App.css'
import SideBar from './component/SideBar/SideBar'
import {Routes, Route} from 'react-router-dom';
import Dashboard from './component/Dashboard/Dashboard';
import History from './component/History/History';
import Admin from  './component/Admin/Admin';
import Login from './component/Login/Login';




function App() {

  return (
    <>
    <div className='App'>
      <SideBar /> 
      <Routes>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/history' element={<History/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/' element={<Login/>} />

    
      </Routes>
    </div>
    </>
  )
}

export default App
