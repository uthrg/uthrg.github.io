import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";
import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  return (
    <div className="app">
      <Edit add={setData} />
      <List listData={data} delData={setData}  editData={setData}/>
    </div>
  );
};

export default Home;
