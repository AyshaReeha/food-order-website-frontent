
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthPage from './pages/Home/Signup.jsx'
import UserPage from './pages/User/UserPage.jsx'
import AdminPage from './pages/Admin/AdminPage.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <App/>
  </BrowserRouter>
   
  
)
