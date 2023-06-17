import React, { useState } from "react";
import { BiNotification, BiMessage } from "react-icons/bi";

const Navbar = () => {
const [search,setSearch] = useState("");
  return (
    <div className="flex row ">
      <div className="col columns-3xl">
       {/* search functionality */}
       <input 
      type="search"
      placeholder="Global Search doesn't work currently."
      className="border border-slate-500  m-5 rounded-sm justify-center items-center"
      value={search}
      onChange={e => {setSearch(e.target.value)}}
      />
      </div>
    </div>
  );
};

export default Navbar;
