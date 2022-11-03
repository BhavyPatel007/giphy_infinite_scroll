import React from "react";
import "./Styles.css";

const Header = ({ onChange, searchValue }) => {
  return (
    <div className="mainHeader">
      <div className="title">Demo Giphy</div>
      <div className="search">
        <input type={"search"} onChange={onChange} value={searchValue} placeholder="Search Giphy..." />
      </div>
    </div>
  );
};

export default Header;
