import React, { useContext, useEffect } from 'react'
import "./App.css";
import { AppContext } from './context/AppContext'
import { Route, Routes, useLocation } from 'react-router';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import TagPage from './Pages/TagPage';
import BlogPage from './Pages/BlogPage';
import { useSearchParams } from 'react-router-dom';

const App = () => {

const {fetchBlogs} = useContext(AppContext);

const [searchParms , setSearchParams] = useSearchParams();
const location = useLocation();

useEffect( () => {
  const page = searchParms.get("page") ?? 1;

  if(location.pathname.includes("tags")) {
      const tag = location.pathname.split("/").at(-1).replaceAll("-" , " "); 
      fetchBlogs(Number(page), tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-" , " "); 
      fetchBlogs(Number(page),null, category);
  }
  else{
    fetchBlogs(Number(page));
  }
    
}, [location.pathname , location.search]);


  return (
   <Routes>
       <Route path='/' element =  {<Home/>} />
       <Route path='/blog/:blogId' element =  {<BlogPage/>} />
       <Route path='/tags/:tag' element =  {<TagPage/>} />
       <Route path='/categories/:category' element =  {<CategoryPage/>} />
   </Routes>
  )
}

export default App
