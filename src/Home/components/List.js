import React from "react";
import Item from "./Item";

const List = ({ listData, delData, setUpdate }) => {
  // console.log('listData ==> ', listData)
  return (
    <div>
      {listData.map((item) => {
        const { id, note, date, time } = item;
        return (
          <Item
            key={id}
            id={id}
            note={note}
            date={date}
            time={time}
            delData={delData}     
            setUpdate={setUpdate}      
            />
        );
      })}
    </div>
  );
};

export default List;
