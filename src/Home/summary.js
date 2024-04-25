import React from "react";
import { NavLink } from "react-router-dom";

const Summary = () => {
  return (
    <>
      <p>Hello,world</p>
      <li><NavLink exact to='/'>home</NavLink></li>
      <li><NavLink to='/summary'>summary</NavLink></li>
    </>
  );
};

export default Summary;
