import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

export default function SideBar() {
    const [cats,setCats] = useState([]);
    useEffect(() => {
       
        const getCat = async ()  => {
            const res = await axios.get("/categories")
            setCats(res.data);
        }
        getCat()
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT</span>
                <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIE</span>
                <ul className="sidebarList">
                    {cats.map((c)=>(
                      <Link to={`/?cat=${c.name}`} className="link">
                      <li className="sidebarListItem">{c.name}</li>
                      </Link>  
                    ))}
                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOWS</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}
