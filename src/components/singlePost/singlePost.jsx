import axios from 'axios';
import { useLocation, } from 'react-router';
import {useContext, useEffect, useState} from 'react';
import './singlePost.css'
import { Link } from 'react-router-dom';
import Context from '../../context/Context';


import { DiscussionEmbed } from 'disqus-react';

export default function SinglePost() {
    const location = useLocation();
    const [post, setPost]= useState({});
    const path = location.pathname.split("/")[2];
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title,setTitle]= useState("");
    const [desc,setDesc]= useState("");
    const [updateMode,setUpdateMode]= useState("");
   
   
  
    useEffect(() => {
        const getPost = async () => {
          const res = await axios.get("/posts/" + path);
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
        };
        getPost();
      }, [path]);
      const handleDelete = async()=>{
          try{
            await axios.delete(`/posts/${post._id}`,{
                data:{username: user.username},
            });
            window.location.replace("/");
          }catch(err){}  
      };
      const handleUpdate = async () => {
        try {
          await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };
      
    return (
        <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}
          <div className="singlePostInfo">
              <span className="singlePostAuthor">
                  <Link to={`/?user=${post.username}`} className="link">  
                          
                  Author : <b> {post.username}</b>
                  </Link>
              </span>
              <span className="singlePostDate">
                {new Date(post.createdAt).toDateString("fr-CA")}             
              </span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
        <div className="singlePostComment">
                <h1>{post.title}</h1>
                <DiscussionEmbed 
          shortname="my-site-web"
          config={
            {
              url: `http://localhost:3000/post/ + ${post._id}`,
              identifier: 0,
              title: "my-site-web",
              
            }
          }
        />
            </div>
            
      </div>
    );
  }
