import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";
import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

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
