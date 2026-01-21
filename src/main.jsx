import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home/Home.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'

// created routers
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,   // layout
    children: [
      {
        index: true,
        element: <Home /> ,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

// render children props
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider  router={router}/>
  </StrictMode>,
)
