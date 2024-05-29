import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [relatedBlog, setRelatedBlog] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

  async function fetchRelatedBlogs() {
    setLoading(true);
    const url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setRelatedBlog(data.relatedBlogs || []);  
      setBlog(data.blog || null); 
    } catch (error) {
      console.log(error);
      setRelatedBlog([]);
      setBlog(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);

  return (
    <div className="w-11/12 max-w-[670px] flex flex-col gap-y-7 p-6 mx-auto items-center">
      
      <Header />
      <div>
        <button className='mt-[80px] rounded py-1 px-4 border-2'
        onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : blog ? (
        <div>
          <BlogDetails post={blog} />
          <h2 className='text-center font-bold text-3xl mb-[20px] mt-[20px]'>Related Blogs</h2>
          {Array.isArray(relatedBlog) && relatedBlog.length > 0 ? (
            relatedBlog.map((post) => (
              <div key={post.id}>
                <BlogDetails post={post} />
              </div>
            ))
          ) : (
            <div>No Related Blogs Found</div>
          )}
        </div>
      ) : (
        <div>No Blogs Found</div>
      )}
    </div>
  );
};

export default BlogPage;
