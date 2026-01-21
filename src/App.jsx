import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import MessageImg from './assets/message.png'

function App() {
  return (
    <div className='app_container'>
      <Header/>
      <Outlet/>
      <button 
        className="message-icon"
        onClick={() => console.log('Message icon clicked')}
        aria-label="Contact support"
      >
       <img src={MessageImg} alt='messgae icon'/>
      </button>
    </div>
  )
}

export default App