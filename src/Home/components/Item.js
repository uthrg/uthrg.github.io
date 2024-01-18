import React, { useState } from "react";

const Item = ({ id, note, date, time, delData, setUpdate }) => {

  // const [edit, setEdit] = useState(false);
  const [isEditMode, setEditMode] = useState(false)

  const editItem = (id) => {
    setEditMode(!isEditMode)
  }

  // let viewMode = {};
  // let editMode = {};
  // if (isEditMode) {
  //   viewMode.display = 'none';
  // } else {
  //   editMode.display = 'none';
  // }

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditMode(false);
    }
  };

  function delItem() {
    delData(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }

  return (
    <div className="item">
      <div>
        {
          isEditMode ? <input defaultValue={note} 
          onChange={(e) => setUpdate(e.target.value, id)}
          onKeyDown={handleUpdatedDone}
          />
          :  <p>{note}</p>
        }
      </div>
      <div>
        <p>{`${date} ${time}`}</p>
      </div>
      <div>
      <button onClick={editItem} className="edit_btn">
        Edit
      </button>
      <button onClick={delItem} className="del_btn">
        DELECT
      </button>
      </div>
    </div>
  );
};

export default Item;
