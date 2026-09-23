import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Protected from './Pages/Protected.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup></Signup>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>

   <Route path='/home' element={<Protected><App></App></Protected>}></Route>
    
     </Routes>
     </BrowserRouter>
  </StrictMode>,
)
