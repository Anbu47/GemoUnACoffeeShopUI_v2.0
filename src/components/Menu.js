import React, { Component } from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { ItemPage } from './ItemPage.js';
import './Menu.css';

export class Menu extends Component {
    state = {
        menuData: [],
    };

    componentDidMount() {
        // Fetch menu data from the REST API and update the state
        fetch('https://unacoffeeshopbe.onrender.com/api/data/getItemData')
            .then((response) => response.json())
            .then((data) => this.setState({ menuData: data }));
    }

    handleButtonClick = (itemID) => {
        this.props.history.push(`/drinks/${itemID}`);
    };

    render() {
        const { menuData } = this.state;

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
                                                        src={item.ImageURL.replace('/file/d/', '/uc?export=view&id=').replace('/preview', '')}
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
                                                        src={item.ImageURL.replace('/file/d/', '/uc?export=view&id=').replace('/preview', '')}
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
            </div>
        );
    }
}
