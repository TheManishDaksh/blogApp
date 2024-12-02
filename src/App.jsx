import {Outlet} from "react-router-dom"
import Header from "./components/header/header"
import Footer from  "./components/footer/footer"
import './App.css'

function App() {

  return (

    <div className=" min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
    
        <Header/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
      
    </div>
    </div>
  )
}

export default App 
