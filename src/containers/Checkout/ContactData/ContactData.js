import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosInstance from "../../../axis-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  makeInputSchema = (placeholder) => {
    // Define desired object
    var obj = {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: placeholder
      },
      value: "",
      validation: { 
        required: true,
        minLength: 5,
        maxLength: 20
      },
      valid: false
    };
    // Return it
    return obj;
  };

  state = {
    orderForm: {
      name: this.makeInputSchema("Your Name"),
      street: this.makeInputSchema("Street"),
      zipCode: this.makeInputSchema("ZipCode"),
      country: this.makeInputSchema("Country"),
      email: this.makeInputSchema("eMail"),
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ],
          value: ""
        }
      },
      loading: false
    }
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdenitier in this.state.orderForm) {
      formData[formElementIdenitier] = this.state.orderForm[
        formElementIdenitier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    console.log(order);
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

  checkValidity(value,rules) {
    // Return true for valid. 
    let isValid = true;
    if (rules.required) { 
      isValid &= value.trim() !== "";
    }

    if (rules.minLength) { 
      isValid &= value.length  >= rules.minLength
    }

    if (rules.maxLength) { 
      isValid &= value.length  <= rules.maxLength
    }

    return isValid;
  }


  inputChangedHandler = (event, inputIdentifier) => {
    // this does not create a new clone since there are nested objects.
    // Only pointers will be copied. Hence we copy selected
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    // this is why we require multiple clones.
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    // To check the validity.
    //console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    // key are properties of object
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* returns jsx */}
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
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
