import React, { useState } from "react";
import { v4 } from 'uuid';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";

const Edit = ({ add }) => {
  const [note, setNote] = useState("");
  function noteChange(e) {
    setNote(e.target.value);
  }

  async function addItem() {
    const data = {
      id: v4(),
      note: note,
    }
    const resp = await axios.post("/todos", data)
    console.log(resp);
    if (resp.data.success) {
      console.log(data);
      add (function(prev) {
        return [ ...prev, data ]
      })
    }

  setNote("")
  }

  return (
    <div>
      <h2>TODO LIST</h2>
      <p>記事</p>
      <input
        type="text"
        value={note}
        onChange={noteChange}
        placeholder="...."
      ></input>
      <br />
      <br />
      <button className="add_bt" onClick={addItem}>
        {" "}
        Add
      </button>
    </div>
  );
};

export default Edit;
