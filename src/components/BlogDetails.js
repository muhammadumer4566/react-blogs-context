import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({post}) => {
  return (
    <div className="border-2 border-slate-200 py-6 px-4 shadow-md rounded-md 
     hover:shadow-2xl transition-all duration-200 cursor-pointer">
        <NavLink to={`/blog/${post.id}`}>

        <p className="text-lg font-bold"> {post.title} </p>

        </NavLink>
        <p className="text-xs">
            By <span className="italic"> {post.author} </span> on { " " } 
            <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`}>

            <span> {post.category} </span>

            </NavLink>
        </p>   
        <p className="text-xs mt-[4px]">
            Posted on {post.date}
        </p>
        <p className="text-md mt-[14px] font-medium"> {post.content} </p>
        <div className="w-full flex gap-x-4 flex-wrap mt-2">

        {
        post.tags.map((tag, index) => (

          <NavLink key={index} to={`/tags/${tag.replaceAll(" ", "-")}`}>
            <span className="text-xs font-bold underline text-blue-700 ">
            {`#${tag}`}</span>
          </NavLink>
        ))}
        </div>
    </div>
  );
};

export default BlogDetails
