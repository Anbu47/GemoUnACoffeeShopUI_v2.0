import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import 'antd/dist/antd.js';
import './Menu.css';

export class Menu extends Component {
    state = {
        menuData: [],
        selectedItem: null,
        drawerOpen: false,
        decoratorData: null,
    };

    componentDidMount() {
        fetch('https://unacoffeeshopbe.onrender.com/api/data/getItemData')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ menuData: data });
            });
    }

    handleButtonClick = (id) => {
        fetch(`https://unacoffeeshopbe.onrender.com/api/data/getItemData${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ selectedItem: data, drawerOpen: true });

                // Fetch decorator data
                this.fetchDecoratorData(data.Decorators);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    fetchDecoratorData = (decoratorIDs) => {
        const promises = decoratorIDs.map((id) =>
            fetch(`https://unacoffeeshopbe.onrender.com/api/data/getDecoratorData${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    return data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    return null;
                })
        );

        Promise.all(promises).then((decoratorData) => {
            this.setState({ decoratorData });
        });
    };

    closeDrawer = () => {
        this.setState({ drawerOpen: false });
    };

    render() {
        const { menuData, selectedItem, drawerOpen, decoratorData } = this.state;

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

                <Drawer
                    open={drawerOpen}
                    onClose={this.closeDrawer}
                    title={selectedItem && selectedItem.Name}
                >
                    {selectedItem && (
                        <div>
                            <h3>{selectedItem.Name}</h3>
                            <p>{selectedItem.Description}</p>
                            <p>Base Price: ${selectedItem.BasePrice.toFixed(2)}</p>
                            {decoratorData && decoratorData.length > 0 && (
                                <div>
                                    <h4>Decorators:</h4>
                                    <ul>
                                        {decoratorData.map((decorator) => (
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
