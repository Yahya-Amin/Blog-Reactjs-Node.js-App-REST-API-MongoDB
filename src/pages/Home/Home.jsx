import './home.css';
import Header from '../../components/Header/Header'
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sidebar/SideBar';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router';


export default function Home() {
    const [posts,setPosts]= useState([]);
    const {search} = useLocation();
    console.log(search)
    

    useEffect(() => {
         const fetchPosts = async () => {
            const res = await axios.get("/posts"+ search);
            setPosts(res.data);
            console.log(search)
            
        }
    fetchPosts();
      }, [search]);
      console.log(posts.values)
    return (
        <>
        <Header/>
        <div className="home">
           <Posts posts={posts}/>
           <SideBar/>
            
        </div>
        </>
    )
}
