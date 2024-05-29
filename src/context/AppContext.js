import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router";


export const AppContext = createContext();

export default function ContextProvider ({children}) {
        
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

   async function fetchBlogs(page = 1 , tag = null, category){

         setLoading(true);
        let url = `${baseUrl}?page=${page}`;

        if(tag){
            url += `&tag=${tag}`;
        }

        if(category){
            url += `&category=${category}`;
        }

        try {
           const result = await fetch(url);
           const data = await result.json();
           console.log(data);
           setPage(data.page);
           setPosts(data.posts);
           setTotalPages(data.totalPages);
        }
        catch (error){
         console.log(error);
        }
        setLoading(false);
    }

    const clickHandler = (page) =>{
        navigate({search:`?page=${page}`});
         setPage(page);
    }

    const value = {
        loading,
        setLoading,
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogs,
        clickHandler,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
