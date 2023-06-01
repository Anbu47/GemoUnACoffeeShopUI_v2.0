import React, { Component } from "react"

import DOMPurify from "dompurify"

export class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountID: "",
      password: "",
      loginError: false,
    }
  }

  handleUsername = (event) => {
    this.setState({ accountID: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleLogin = (event) => {
    event.preventDefault()
    const { accountID, password } = this.state

    // Prepare the request body
    const requestBody = {
      accountID: accountID,
      password: password,
    }

    // Make the API call
    fetch("https://unacoffeeshopbe.onrender.com/api/data/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self'; img-src 'self'; media-src 'self'; frame-src 'none'; font-src 'self'; connect-src 'self'",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data === true) {
          // Successful login
          this.setState({ loginError: false })
          console.log("Login successful")
          // Redirect or perform other actions as needed
        } else {
          // Failed login
          this.setState({ loginError: true })
          console.log("Login failed")
          window.alert("Login failed. Please try again.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  render() {
    const { accountID, password, loginError } = this.state

    const sanitizedUsername = DOMPurify.sanitize(accountID)
    const sanitizedPassword = DOMPurify.sanitize(password)
    return (
      <div>
        <div className="container">
          <h1>Admin Login</h1>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label>Account ID</label>
              <input
                type="text"
                className="form-control"
                value={sanitizedUsername}
                onChange={this.handleUsername}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={sanitizedPassword}
                onChange={this.handlePassword}
                required
              />
            </div>
            {loginError && (
              <p className="text-danger">
                Invalid username or password. Please try again.
              </p>
            )}
            {!loginError && (
              <p className="text-success">Login successful. Welcome!</p>
            )}

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
