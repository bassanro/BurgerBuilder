import React from "react";
import classes from "./NavigationsItems.css";
import NavigationItem from "./NavigationsItem/NavigationsItem";

const NavigationsItems = () => (
  <ul className={classes.NavigationsItems}>
    <NavigationItem link="/" exact active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default NavigationsItems;
