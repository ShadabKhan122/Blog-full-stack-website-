import React from 'react'
import NavBar from './components/NavBar'
import Jumbotron from './components/Jumbotron'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import AddBlogPage from './pages/AddBlogPage'
import PageNotFound from './pages/PageNotFound'
import { createBrowserRouter,RouterProvider , createRoutesFromElements, Route } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import EditBlogPage from './pages/EditBlogPage'
import axios from 'axios'
import { toast } from 'react-toastify'

const App = () => {

  const createBlog = (data) =>{
    axios.post("http://127.0.0.1:8008/blogs/", data)
    .then(res => {
      
      console.log(res.data)
      toast.success("Blog added sucessfully!")
    })
    .catch(err => console.log (err.message))
  } 
  
  const updateBlog = (data, slug) =>{
    axios.put(`http://127.0.0.1:8008/blogs/${slug}/`, data)
    .then(res =>{
      toast.success("blog Update Successfully")
    })
    .catch(err =>console.log(err.message) )
  }

  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
       <Route index element={<HomePage/>}/>
       <Route path="/add-blog"  element={<AddBlogPage  createBlog={createBlog}/>}/>
       <Route path="/blogs/:slug" element={<DetailPage />} />
       <Route path="blogs/edit/:slug" element={<EditBlogPage updateBlog={updateBlog} />} />
       <Route path="*" element={<PageNotFound />} />
    </Route>
  ))


  return (
    <RouterProvider router={router} />
  )
}

export default App
