import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";

import React, { useState, useEffect  } from "react";
import { NavLink, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5500/api";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {     
    const resp = axios.get("/todos").then((resp) => {
      console.log(resp.data);
      setData(resp.data)
    })
  }, []);



  //編輯 Update
  async function setUpdate (updatedNote, id) {
    const resp= await axios.put((`todos/${id}`), {
      note: updatedNote
    })
    console.log("updatedNote:", updatedNote)
    console.log("id:",id)
    setData(
      data.map((data) => {
        if (data.id === id) {
          data.note = updatedNote;
        }
        return data;
      })
      );
  };

  //刪除
  const [deleteId, setDeleteId] = useState("");

  async function delData (id) {
    // setShow(true);
    const resp = await axios.delete(`/todos/${id}`)
    console.log(resp)
    if(resp.data.success){
      setDeleteId(id);
      setData(data.filter(prev => prev.id !== id))
    }
  }

  function NavButton() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/login');
    };
  
    return (
        <VscAccount onClick={handleClick} className="login_icon"/>
    );
  }

  return (
    <div className="app">
      <NavButton />
      <Edit add={setData} />
      <List listData={data} delData={delData} setUpdate={setUpdate}/>
      {/* <li><NavLink exact to='/'>home</NavLink></li>
      <li><NavLink to='/summary'>summary</NavLink></li> */}
    </div>
  );
}; 

export default Home;
