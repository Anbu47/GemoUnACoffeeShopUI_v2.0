import React, { Component } from "react";

import Comment from "./Comment";

class Order extends Component {
  state = {
    orderData: [],
    showCommentSection: false,
  };

  componentDidMount() {
    this.fetchOrderData();
  }

  fetchOrderData = () => {
    fetch("https://unacoffeeshopbe.onrender.com/api/data/getCartOrderData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ orderData: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  toggleCommentSection = () => {
    this.setState((prevState) => ({
      showCommentSection: !prevState.showCommentSection,
    }));
  };

  render() {
    const { orderData, showCommentSection } = this.state;

    return (
      <div>
        <h2>Cart Order</h2>
        <div className="card-body">
          <div className="card mb-4">
            <div className="card-body">
              {orderData.map((item) => {
                const { OrderID, ProfileID, Description, Cost, Status } = item;
                const tax = Cost * 0.0725;
                const totalPrice = Cost + tax;

                return (
                  <div className="row border rounded mb-2" key={OrderID}>
                    <p>Order By: {ProfileID}</p>
                    <p>Description: {Description}</p>
                    <p>Cost: ${Cost.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>

                    <p className="fw-bold mb-0"></p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span>
                      ${totalPrice.toFixed(2)}
                    </p>
                    <p>Status: {Status}</p>
                    <button
                      className="btn btn-primary"
                      onClick={this.toggleCommentSection}
                    >
                      {showCommentSection ? "Hide Comments" : "Show Comment"}
                    </button>
                    {showCommentSection && <Comment orderId={OrderID} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;