import { useState } from 'react'
import './index.css'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col min-h-full">
  <Navbar />

  <div className="relative flex-1">
    <div className='absolute inset-0 -z-10 h-full w-full bg-green-50 
      bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
      linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
      bg-[size:14px_24px]' />
      
    <Manager />
  </div>

  <Footer />
</div>
  )
}

export default App
