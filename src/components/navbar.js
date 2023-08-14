import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";

const Navbar = () => {
  const lengthItems = useSelector((state) => state.cartDetail.value);

  return (
    <div className="navbar" style={{ backgroundColor: "#FFA500" /* Orange color */ }}>
      <div className="nav_box">
        <span className="my_shop">
          <Link to={`/`} style={{ color: "white", textDecoration: "none", fontWeight: "bolder", fontSize: "30px", marginLeft: "400px" }}>
            E-Buy
          </Link>
          <Link to={`/`} style={{ color: "white", textDecoration: "none", marginLeft: "40px", fontSize: "20px" }}>
            Products
          </Link>
        </span>
        <div className="cart">
          <Link to={`/Cart`} style={{ textDecoration: "none", fontSize: "15px" }}>
            <span className="icons">
              <FontAwesomeIcon icon={faCartArrowDown} />
            </span>
            <span>{lengthItems?.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


