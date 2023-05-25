import React, { Component } from 'react';

export class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountID: '',
            password: '',
            loginError: false,
        };
    }

    handleUsername = (event) => {
        this.setState({ accountID: event.target.value });
    };

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    handleLogin = (event) => {
        event.preventDefault();
        const { accountID, password } = this.state;

        // Prepare the request body
        const requestBody = {
            Name: accountID,
            Pass: password,
        };

        // Make the API call
        fetch('https://unacoffeeshopbe.onrender.com/api/data/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data === true) {
                    // Successful login
                    this.setState({ loginError: false });
                    console.log('Login successful');
                    // Redirect or perform other actions as needed
                } else {
                    // Failed login
                    this.setState({ loginError: true });
                    console.log('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    render() {
        const { accountID, password, loginError } = this.state;

        return (
            <div className="container">
                <h1>Admin Login</h1>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label>Account ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountID}
                            onChange={this.handleUsername}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={this.handlePassword}
                            required
                        />
                    </div>
                    {loginError && <p className="text-danger">Invalid username or password. Please try again.</p>}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}