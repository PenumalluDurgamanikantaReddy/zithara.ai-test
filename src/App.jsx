import { useState } from 'react'
import DashBoard from './pages/DashBoard'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes';



function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([...routes])
  return (
    <div className=' dark:bg-gray-800'>
  <RouterProvider router={router}/>
    </div>
  )
}

export default App
