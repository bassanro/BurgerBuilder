import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosInstance from "../../../axis-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "Roshan Bassan",
    address: {
      street: "test street",
      zipCode: "2000",
      country: "Germany"
    },
    email: "test@test.com"
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Roshan Bassan",
        address: {
          street: "test street",
          zipCode: "2000",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axiosInstance
      .post("/orders.json", order)
      .then((reponse) => {
        this.setState({ loading: false });
        console.log(reponse);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
