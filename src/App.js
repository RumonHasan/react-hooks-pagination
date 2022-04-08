import axios from 'axios';
import React, {useEffect, useState, createContext} from 'react';
import Post from './components/Post';
import Paginate from './components/Paginate';
import './style.css';

const URL = 'https://jsonplaceholder.typicode.com/todos';

export const PageContext = createContext();

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // posts and pagination 
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  
  // fetching the data
    useEffect(()=>{
        setLoading(true);
        const getPosts = async ()=>{
            const {data} = await axios.get(URL);
            setPosts(data);
            setLoading(false)
        }
        getPosts();
    },[]);

    // number of posts
    const lastPageIndex = postsPerPage * currentPageIndex; // gets the last index 
    const firstPageIndex = lastPageIndex - postsPerPage;
    const paginatedPosts = posts.slice(firstPageIndex, lastPageIndex);

    // basic paginate function
    const paginateFunc = (pageNumber)=>{
        setCurrentPageIndex(pageNumber);
    }

  return (
    <div>
        <PageContext.Provider value={{
            postsPerPage, currentPageIndex,
            paginatedPosts, posts, paginateFunc, setCurrentPageIndex
        }}>
            {paginatedPosts.map((singlePost, index)=>{
                return (
                    <ul key={index}>
                        <Post postTitle={singlePost.title}/>
                    </ul>
                )
            })}
            <Paginate/>
        </PageContext.Provider>
    </div>
  )
};

export default App;
