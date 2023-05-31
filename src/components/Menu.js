import "antd/dist/antd.js"
import "./Menu.css"

import React, { Component } from "react"

import { ItemDrawer } from "./ItemDrawer"
import { Link } from "react-router-dom"

export class Menu extends Component {
  state = {
    menuData: [],
    selectedItem: null,
    drawerOpen: false,
    decorators: null,
  }

  componentDidMount() {
    fetch("https://unacoffeeshopbe.onrender.com/api/data/getItemData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ menuData: data })
      })
  }

  handleButtonClick = (id) => {
    fetch(`https://unacoffeeshopbe.onrender.com/api/data/getItemData${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ selectedItem: data, drawerOpen: true })

        // Fetch decorator data
        this.fetchDecoratorData(data.Decorators)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  fetchDecoratorData = (decoratorIDs) => {
    if (!decoratorIDs) {
      // Handle the case where decoratorIDs is undefined
      this.setState({ decorators: [] })
      return
    }
    const promises = decoratorIDs.map((id) =>
      fetch(
        `https://unacoffeeshopbe.onrender.com/api/data/getDecoratorData${id.ID}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          return data
        })
        .catch((error) => {
          console.error("Error:", error)
          return null
        })
    )

    Promise.all(promises).then((decorators) => {
      this.setState({ decorators })
    })
  }

  closeDrawer = () => {
    this.setState({ drawerOpen: false })
  }

  render() {
    const { menuData, selectedItem, drawerOpen, decorators } = this.state

    return (
      <div className="menu">
        <div className="category">
          <h2>Drinks</h2>
          <ul>
            {menuData
              .filter((item) => item.Type === "Drink")
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
                            src={item.ImageURL.replace(
                              "/file/d/",
                              "/uc?export=view&id="
                            ).replace("/preview", "")}
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
              .filter((item) => item.Type === "Food")
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
                            src={item.ImageURL.replace(
                              "/file/d/",
                              "/uc?export=view&id="
                            ).replace("/preview", "")}
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

        <ItemDrawer
          selectedItem={selectedItem}
          drawerOpen={drawerOpen}
          onClose={this.closeDrawer}
          decorators={decorators}
        />
      </div>
    )
  }
}
