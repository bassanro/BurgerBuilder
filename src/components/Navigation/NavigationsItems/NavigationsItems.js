import React from "react";
import classes from "./NavigationsItems.css";
import NavigationItem from "./NavigationsItem/NavigationsItem";

const NavigationsItems = () => (
  <ul className={classes.NavigationsItems}>
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationsItems;
