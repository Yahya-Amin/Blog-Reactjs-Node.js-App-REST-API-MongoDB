import SideBar from '../../components/sidebar/SideBar';
import './settings.css';
import { useContext, useState } from 'react';
import Context from '../../context/Context';
import axios from 'axios';


export default function Settings() {
   
    const {user,dispatch} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [succsess, setSuccsess] = useState("");
    const PF = "http://localhost:5000/images/";
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_START'})
        const updateUser = {
          userId: user._id,
          username,
          email,
          password,
        };
        if (file) {
          const data =new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updateUser.profilePic = filename;
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
           const res = await axios.put("/users/" + user._id, updateUser)
            setSuccsess(true)
            dispatch({type: "UPDATE_SUCCESS",payload:res.data})
        } catch (err) {
            dispatch({type: 'UPDATE_FAILURE'})
        }
      };
     
      const handleDelete = async()=>{
        try{
          await axios.delete(`/users/${user._id}`,{
              data:{userId:user._id},
          }).then(res => console.log(res.data));
          dispatch({ type: "LOGOUT" });
          alert("vous avez supprimer votre compte !!")
        }catch(err){
            
        }  
    };
   
  



    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Modifier votre compte</span>
                   
                   
                    <span onClick={handleDelete}
                     className="settingsDeleteTitle" 
                    >Supprimer votre compte</span>
                     
                </div>
                <form  className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile picture</label>
                        <div className="settingsPP">
                        <img
                             src={file ? URL.createObjectURL(file) : PF+user.profilePic}
                             alt=""
                             />
                            <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                            </label>
                            <input type="file"
                             id="fileInput" 
                             style={{display:'none'}} 
                             onChange={(e) => setFile(e.target.files[0])}
                             />
                        </div>
                    <label>username</label>
                    <input type="text"
                     placeholder={user.username}
                     onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>E-mail</label>
                    <input type="email"
                     placeholder={user.email}
                     onChange={(e) => setEmail(e.target.value)}
                     />
                    <label>Password</label>
                    <input type="password"
                     onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">Mettre à jour le Profile</button>
                    {succsess && <span style={{color:'green',textAlign:'center',marginTop:'20px',fontSize:'20px'}}>Le profil a été mis à jour... </span>}
                </form>
            </div>
            <SideBar/>
        </div>
    )
}
