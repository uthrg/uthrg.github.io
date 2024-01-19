import React, { useState } from "react";

const Item = ({ id, note, date, time, setUpdate ,delData}) => {

  const [isEditMode, setEditMode] = useState(false)
  const [updateInput, setUpdateInput] = useState(note);
  // const editInputRef = useRef(null);

  const editItem = (id) => {
    setEditMode(!isEditMode)
  }

  function handleUpdatedDone(event) {
    if (event.key === 'Enter') {
      setUpdate(updateInput, id);
      setEditMode(false);
    }
  }


  // function delItem() {
  //   delData(function (prev) {
  //     return prev.filter((item) => item.id !== id);
  //   });
  // }

  return (
    <div className="item">
      <div>
        {
          isEditMode ? <input defaultValue={updateInput} 
          // ref={editInputRef}
          onChange={(e) => {
            setUpdateInput(e.target.value)
          }}
          onKeyDown={handleUpdatedDone}
          />
          :  <p>{updateInput}</p>
        }
      </div>
      <div>
        <p>{`${date} ${time}`}</p>
      </div>
      <div>
      <button onClick={editItem} className="edit_btn">
        EDIT
      </button>
      <button onClick={() => delData(id)} className="del_btn">
        DELETE
      </button>
      </div>
    </div>
  );
};

export default Item;
