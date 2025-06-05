
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Componants/Navbar'
import Home from './Componants/Home'
import Paste from './Componants/Paste'
import ViewPaste from './Componants/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <div>
          <Navbar />
          <Home />
        </div>
    },

    {
      path: '/pastes',
      element: <div>

        <Navbar />
        <Paste />
      </div>
    },

    {
      path: '/pastes/:id',
      element: <div>
        <Navbar />
        <ViewPaste />
      </div>
    },
  ]
)

function App() {

  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )

}

export default App
