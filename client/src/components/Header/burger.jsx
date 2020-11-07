import React, { Fragment, useState } from "react";
import DropNav from "./dropNav";
import "./burger.styles.scss";

const Burger = () => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <div
        className={`burgerComponent ${open ? "openBurger" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div />
        <div />
        <div />
      </div>
      <DropNav open={open} />
    </Fragment>
  );
};

export default Burger;
