import React, { Component } from "react"

import Comment from "./Comment"

class Order extends Component {
  state = {
    orderData: [],
    showCommentSection: false,
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
    const { order, user, showCommentSection } = this.state

    return (
      <div>
        <h2>Cart Order</h2>
        <div className="card-body">
          <div className="card mb-4">
            <div className="card-body">
              {orderData.map((item) => (
                <div className="row border rounded mb-2" key={item.OrderID}>
                  <p>Order By: {item.ProfileID}</p>

                  <p>Description: {item.Description}</p>
                  <p>Cost: ${item.Cost.toFixed(2)}</p>
                  <p>Tax: 0.12</p>

                  <p className="fw-bold mb-0"></p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total</span> $ $
                    {item.Cost.toFixed(2)}
                  </p>
                  <p>Status: {item.Status}</p>
                  <button
                    className="btn btn-primary"
                    onClick={this.toggleCommentSection}
                  >
                    {showCommentSection ? "Hide Comments" : "Show Comment"}
                  </button>
                  {showCommentSection && <Comment orderId={order._id} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
