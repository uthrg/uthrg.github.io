import React, { useState } from "react";
import { v4 } from 'uuid';

const Edit = ({ add }) => {
  const [note, setNote] = useState("");
  function noteChange(e) {
    setNote(e.target.value);
  }

  const [date, setDate] = useState("");
  function dateChange(e) {
    setDate(e.target.value);
  }

  const [time, setTime] = useState("");
  function timeChange(e) {
    setTime(e.target.value);
  }

  function addItem() {
    add(function (prev) {
      return [
        {
          id: v4(),
          note,
          date,
          time,
        },
        ...prev,
      ];
    });
    setNote("")
    setDate("")
    setTime("")
  }

  return (
    <div>
      <h2>TODO LIST</h2>
      <p>日期</p>
      <input type="date" value={date} onChange={dateChange}></input>
      <p>時間</p>
      <input type="time" value={time} onChange={timeChange}></input>
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
        Add Tast
      </button>
    </div>
  );
};

export default Edit;
