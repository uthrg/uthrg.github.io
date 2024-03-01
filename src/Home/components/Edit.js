import React, { useState } from "react";
import { v4 } from 'uuid';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500/";

const Edit = ({ add }) => {
  const [note, setNote] = useState("");
  function noteChange(e) {
    setNote(e.target.value);
  }

  // const [date, setDate] = useState("");
  // function dateChange(e) {
  //   setDate(e.target.value);
  // }

  // const [time, setTime] = useState("");
  // function timeChange(e) {
  //   setTime(e.target.value);
  // }

  async function addItem() {
    const data = {
      id: v4(),
      note: note,
    }
    const resp = await axios.post("/todos", data)
    console.log(resp);
    // console.log(data.id)
    if (resp.data.success) {
      console.log(data);
      add (function(prev) {
        return [ ...prev, data ]
      })
    }
    // .then((resp) => {
    //   let dataLength = resp.data.data.length
    //   console.log("data:", resp.data.data[dataLength-1])
    //   add (function(prev) {
    //     return [ resp.data.data[dataLength-1], ...prev ]
    //   })
    // }
    // )

  setNote("")
  // setDate("")
  // setTime("")
  }


  // function addItem() {
  //   add(function (prev) {
  //     return [
  //       {
  //         id: v4(),
  //         note,
  //         date,
  //         time,
  //       },
  //       ...prev,
  //     ];
  //   });
  //   setNote("")
  //   setDate("")
  //   setTime("")
  // }

  return (
    <div>
      <h2>TODO LIST</h2>
      {/* <p>日期</p>
      <input type="date" value={date} onChange={dateChange}></input>
      <p>時間</p>
      <input type="time" value={time} onChange={timeChange}></input> */}
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
