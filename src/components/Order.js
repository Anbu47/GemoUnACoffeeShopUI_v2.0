import React, { Component } from "react"

import Comment from "./Comment"
import Rating from "./Rating"

class Order extends Component {
  state = {
    orderData: [],
    showCommentSection: false,
    selectedOrderId: null, // New state variable to track the selected order ID
  }

  componentDidMount() {
    this.fetchOrderData()
  }

  fetchOrderData = () => {
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

  toggleCommentSection = (orderId) => {
    this.setState((prevState) => ({
      showCommentSection: !prevState.showCommentSection,
      selectedOrderId: orderId, // Set the selected order ID
    }))
  }
  handleOrderStatus = (status) => {
    switch (status) {
      case 1:
        return "pending"
      case 2:
        return "received / in progress"
      case 3:
        return "completed"
      case 4:
        return "cancelled"
      default:
        return ""
    }
  }

  render() {
    const { orderData, showCommentSection, selectedOrderId } = this.state

    return (
      <div>
        <h2>Cart Order</h2>
        <div className="card-body">
          <div className="card mb-4">
            <div className="card-body">
              {orderData.map((item) => {
                const { OrderID, ProfileID, Description, Cost, Status } = item
                const tax = Cost * 0.0725
                const totalPrice = Cost + tax

                return (
                  <div className="row border rounded mb-2" key={OrderID}>
                    <p>Order By: {ProfileID}</p>
                    <p>Description: {Description}</p>
                    <p>Cost: ${Cost.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <p className="fw-bold mb-0"></p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span>$
                      {totalPrice.toFixed(2)}
                    </p>
                    <p>Status: {this.handleOrderStatus(Status)}</p>
                    <Rating value={item.Rating} />

                    <button
                      className="btn btn-primary"
                      onClick={this.toggleCommentSection}
                    >
                      {showCommentSection && selectedOrderId === OrderID
                        ? "Hide Comments"
                        : "Show Comment"}
                    </button>
                    {showCommentSection && <Comment orderId={OrderID} />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
