import React, { Component } from "react"
// import { clearCart, removeFromCart } from "../../redux/actions/cartActions"

import { Modal } from "reactstrap"
import axios from "axios"
import { connect } from "react-redux"
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: props.isModalOpen,
      user: JSON.parse(localStorage.getItem("user")),
    }
  }
  handleClose = () => {
    this.props.handleClose()
  }

  handleRemoveCartItem = (itemId) => {
    this.props.removeFromCart(itemId)
  }

  handleClearCart = () => {
    this.props.clearCart()
  }
  render() {
    const { cart } = this.props
    const { items } = cart
    return (
      <Modal
        show={this.state.isModalOpen}
        onHide={this.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ></Modal>
    )
  }
}
