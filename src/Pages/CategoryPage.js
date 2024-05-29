import React from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router'
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

const CategoryPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/").at(-1);
  return (
    <div>
      <Header/>
         <div>
             <button  className='mt-[80px] rounded py-1 px-4 border-2'
              onClick={ () => navigate(-1) } >
                Back
             </button>
             <h2 className='text-center font-bold text-3xl'>
              Blogs on <span>{category} </span>
             </h2>
         </div>
         <Blogs/>
         <Pagination/>
    </div>
  )
}

export default CategoryPage
