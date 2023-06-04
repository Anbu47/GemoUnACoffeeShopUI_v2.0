import React, { Component } from "react"

class Order extends Component {
  state = {
    orderData: [],
  }

  componentDidMount() {
    fetch("https://unacoffeeshopbe.onrender.com/api/data/getCartOrderData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ orderData: data })
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  render() {
    const { orderData } = this.state

    return (
      <div>
        <h2>Cart Order</h2>
        <ul>
          {orderData.map((item) => (
            <li key={item.OrderID}>
              <p>Description: {item.Description}</p>
              <p>Cost: ${item.Cost.toFixed(2)}</p>
              <p>Status: {item.Status}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Order
