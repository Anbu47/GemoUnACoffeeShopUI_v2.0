import "./ItemDrawer.css"

import { Checkbox, Drawer } from "antd"
import React, { Component } from "react"

export class ItemDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDecorators: {},
    }
  }

  handleDecoratorChange = (groupId, decoratorId) => {
    this.setState((prevState) => {
      const { selectedDecorators } = prevState
      const updatedDecorators = { ...selectedDecorators }

      if (selectedDecorators[groupId] === decoratorId) {
        // If the same decorator is selected, uncheck it
        delete updatedDecorators[groupId]
      } else {
        // Set the selected decorator
        updatedDecorators[groupId] = decoratorId
      }

      return {
        selectedDecorators: updatedDecorators,
      }
    })
  }

  render() {
    const { selectedItem, drawerOpen, onClose, decorators } = this.props
    const { selectedDecorators } = this.state

    // Group decorators by GroupID
    const groupedDecorators = decorators
      ? decorators.reduce((groups, decorator) => {
          if (!groups[decorator.GroupID]) {
            groups[decorator.GroupID] = []
          }
          groups[decorator.GroupID].push(decorator)
          return groups
        }, {})
      : {}

    return (
      <Drawer
        visible={drawerOpen}
        onClose={onClose}
        title={selectedItem && selectedItem.Name}
      >
        {selectedItem ? (
          <div className="item-drawer">
            <h3 className="item-name">{selectedItem.Name}</h3>
            <p className="item-description">{selectedItem.Description}</p>
            <p className="item-price">
              Base Price: ${selectedItem.BasePrice.toFixed(2)}
            </p>
            {decorators && decorators.length > 0 && (
              <div className="decorators-section">
                <h4 className="decorators-title">Decorators:</h4>
                <ul className="decorators-list">
                  {Object.entries(groupedDecorators).map(
                    ([groupId, decorators]) => (
                      <li className="decorator-item" key={groupId}>
                        {decorators.map((decorator) => (
                          <div key={decorator.ID}>
                            <Checkbox
                              className="decorator-checkbox"
                              onChange={() =>
                                this.handleDecoratorChange(
                                  groupId,
                                  decorator.ID
                                )
                              }
                              checked={
                                selectedDecorators[groupId] === decorator.ID
                              }
                            >
                              {decorator.Name} - ${decorator.Price.toFixed(2)}
                            </Checkbox>
                          </div>
                        ))}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="item-drawer">No item selected</div>
        )}
      </Drawer>
    )
  }
}
