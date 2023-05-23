import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css'; //check style again

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    }

    render() {
        const { collapsed } = this.state;

        return (
            <header>
                <Navbar color="light" light expand="md" className="border-bottom box-shadow mb-3">
                    <NavbarBrand tag={Link} to="/">UnACoffeeShopWeb</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button tag={Link} className="text-pastel-primary" to="/" color="pastel-primary">
                                    Home
                                </Button>
                            </NavItem>
                            <NavItem>
                                <Button tag={Link} className="text-pastel-secondary" to="/menu" color="pastel-secondary">
                                    Menu
                                </Button>
                            </NavItem>
                            <NavItem>
                                <Button tag={Link} className="text-pastel-tertiary" to="/cart" color="pastel-tertiary">
                                    Cart
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}