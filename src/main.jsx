import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from "./store/store.js"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './Pages/Home.jsx'
import Login from './components/Login.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import Signup from './Pages/SignupPage.jsx'
import AllPosts from "./Pages/AllPosts.jsx"
import AddPost from "./Pages/AddPost.jsx"
import EditPost from "./Pages/EditPost.jsx"
import Post from './Pages/Post.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/login",
        element : (
          <AuthLayout authentication = {false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : "/signup",
        element : (
          <AuthLayout authentication = {false}>
            <Signup/> 
          </AuthLayout>
        )
      },
      {
        path : "/all-Posts",
        element : (
          <AuthLayout authentication >
            {" "}
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path : "/add-Post",
        element : (
          <AuthLayout authentication >
            {" "}
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path : "/edit-Post/:slug",
        element : (
          <AuthLayout authentication>
            {" "}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path : "/post/:slug",
        element : (
          <AuthLayout>
            <Post/>
          </AuthLayout>
        )
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
