import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";
import React, { useState, useEffect  } from "react";

const Home = () => {
  const itemFromLocalStorage = localStorage.getItem('items')
  let newItems
  if (itemFromLocalStorage) {
    newItems = JSON.parse(itemFromLocalStorage);
  } else {
    newItems = []
  }
  // const newItems = JSON.parse(localStorage.getItem('id') || '[]');

  const [data, setData] = useState(newItems);
  

  useEffect(() => {     
    console.log("data", data)
    localStorage.setItem('items', JSON.stringify(data));
  }, [data]);

  const setUpdate = (updatedNote, id) => {
    // update state
    setData(
      data.map((data) => {
        if (data.id === id) {
          data.note = updatedNote;
        }
        return data;
      })
    );
  };

  return (
    <div className="app">
      <Edit add={setData} />
      <List listData={data} delData={setData} setUpdate={setUpdate}/>
    </div>
  );
}; 

export default Home;
