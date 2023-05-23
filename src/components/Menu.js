import React, { Component } from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { ItemPage } from './ItemPage.js';
import './Menu.css';
import { Drawer, Button } from 'antd';
import 'antd/dist/antd.js';

export class Menu extends Component {
    state = {
        menuData: [],
        selectedItem: null, // Store the selected item data
        drawerVisible: false, // Control the visibility of the drawer
    };

    componentDidMount() {
        // Fetch menu data from the REST API and update the state
        fetch('https://unacoffeeshopbe.onrender.com/api/data/getItemData')
            .then((response) => response.json())
            .then((data) => this.setState({ menuData: data }));
    }

    handleButtonClick = (id) => {
        // Fetch the data for the selected item using the itemID
        fetch(`https://unacoffeeshopbe.onrender.com/api/data/getItemData/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // Update the state with the selected item data
                this.setState({
                    selectedItem: data,
                    drawerVisible: true, // Show the drawer
                });
            });
    };

    closeDrawer = () => {
        this.setState({ drawerVisible: false }); // Hide the drawer
    };

    render() {
        const { menuData, selectedItem, drawerVisible } = this.state;

        return (
            <div className="menu">
                <div className="category">
                    <h2>Drinks</h2>
                    <ul>
                        {menuData
                            .filter((item) => item.Type === 'Drink')
                            .map((item) => (
                                <li key={item.ID}>
                                    <div className="item-details">
                                        <div className="item-info">
                                            <h3>{item.Name}</h3>
                                            <p className="description">{item.Description}</p>
                                            <p className="price">${item.BasePrice.toFixed(2)}</p>
                                        </div>
                                        <div className="item-actions">
                                            <Link to={`/drinks/${item.ID}`} className="item-link">
                                                <div className="item-wrapper">
                                                    <img
                                                        src={item.ImageURL.replace('/file/d/', '/uc?export=view&id=').replace(
                                                            '/preview',
                                                            ''
                                                        )}
                                                        alt={item.Name}
                                                        className="item-image"
                                                    />
                                                </div>
                                            </Link>
                                            <button
                                                className="btn btn-pastel-primary"
                                                onClick={() => this.handleButtonClick(item.ID)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="category">
                    <h2>Foods</h2>
                    <ul>
                        {menuData
                            .filter((item) => item.Type === 'Food')
                            .map((item) => (
                                <li key={item.ID}>
                                    <div className="item-details">
                                        <div className="item-info">
                                            <h3>{item.Name}</h3>
                                            <p className="description">{item.Description}</p>
                                            <p className="price">${item.BasePrice.toFixed(2)}</p>
                                        </div>
                                        <div className="item-actions">
                                            <Link to={`/foods/${item.ID}`} className="item-link">
                                                <div className="item-wrapper">
                                                    <img
                                                        src={item.ImageURL.replace('/file/d/', '/uc?export=view&id=').replace(
                                                            '/preview',
                                                            ''
                                                        )}
                                                        alt={item.Name}
                                                        className="item-image"
                                                    />
                                                </div>
                                            </Link>
                                            <button
                                                className="btn btn-pastel-secondary"
                                                onClick={() => this.handleButtonClick(item.ID)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Render the item details in a Drawer */}
                <Drawer
                    visible={drawerVisible}
                    onClose={this.closeDrawer}
                    title={selectedItem && selectedItem.Name}
                >
                    {selectedItem && (
                        <div>
                            <h3>{selectedItem.Name}</h3>
                            <p>{selectedItem.Description}</p>
                            <p>Base Price: ${selectedItem.BasePrice.toFixed(2)}</p>
                            {selectedItem.Decorators && selectedItem.Decorators.length > 0 && (
                                <div>
                                    <h4>Decorators:</h4>
                                    <ul>
                                        {selectedItem.Decorators.map((decorator) => (
                                            <li key={decorator.ID}>
                                                {decorator.Name} - ${decorator.Price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </Drawer>
            </div>
        );
    }
}