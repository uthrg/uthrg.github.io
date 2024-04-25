import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";
import axios from "axios";

import React, { useState, useEffect  } from "react";
import { NavLink } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5500/api";

const Home = () => {
  // const itemFromLocalStorage = localStorage.getItem('items')
  // let newItems
  // if (itemFromLocalStorage) {
  //   newItems = JSON.parse(itemFromLocalStorage);
  // } else {
  //   newItems = []
  // }
  // const newItems = JSON.parse(localStorage.getItem('id') || '[]');

  // const [data, setData] = useState(newItems);
  const [data, setData] = useState([]);

  useEffect(() => {     
    const resp = axios.get("/todos").then((resp) => {
      console.log(resp.data);
      setData(resp.data)
    })
    // console.log("data", data)
    // localStorage.setItem('items', JSON.stringify(data));    //Json.stringify ->陣列改字串
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
  // const [show, setShow] = useState(false);

  // const handleClose = () => {
  //   setShow(false)
  // }

  async function delData (id) {
    // setShow(true);
    const resp = await axios.delete(`/todos/${id}`)
    console.log(resp)
    if(resp.data.success){
      setDeleteId(id);
      setData(data.filter(prev => prev.id !== id))
    }
    // .then (() => {
    //   setDeleteId(id);
    //   console.log(id);
    //   setData(data.filter(prev => prev.id !== id))
    // }
    // )
  }
  
  // const handleDelItem = () => {
  //   setData(data.filter(prev => prev.id !== deleteId))
  // }

  return (
    <div className="app">
      <Edit add={setData} />
      <List listData={data} delData={delData} setUpdate={setUpdate}/>
      <li><NavLink exact to='/'>home</NavLink></li>
      <li><NavLink to='/summary'>summary</NavLink></li>
    </div>
  );
}; 

export default Home;
