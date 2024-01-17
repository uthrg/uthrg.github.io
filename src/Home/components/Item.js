import React from "react";

const Item = ({ id, note, date, time, delData }) => {
  function delItem() {
    delData(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }

  return (
    <div className="item">
      <div>
        <p>{note}</p>
      </div>
      <div>
        <p>{`${date} ${time}`}</p>
      </div>
      <div>
      <button className="edit_btn">
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
