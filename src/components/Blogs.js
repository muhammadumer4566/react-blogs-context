import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from "./Spinner";
import BlogDetails from './BlogDetails';

const Blogs = () => {

  const { posts, loading } = useContext(AppContext);
  return (
    <div className="w-11/12 max-w-[670px] flex flex-col gap-y-7 py-3 mx-auto mt-[5rem] mb-[4rem] items-center  ">
         {
          loading ? 

          <Spinner/> 

          : posts.length === 0 ? (
               <div className="text-center text-3xl font-semibold">
                <p>No Blogs Found</p>
               </div>
          ) :
            posts.map( (post) => <BlogDetails post = {post} key={post.id} />) 
         }
    </div>
  )
}

export default Blogs
