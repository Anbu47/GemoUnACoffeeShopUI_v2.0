import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class ItemPage extends Component {
    state = {
        itemData: null,
        decoratorData: [],
    };

    componentDidMount() {
        const { match } = this.props;
        const { id } = this.props.match.params;

        // Fetch the item details based on the ID
        fetch(`https://unacoffeeshopbe.onrender.com/api/data/getItemData/${id}`)
            .then((response) => response.json())
            .then((data) => this.setState({ itemData: data }));

        // Fetch the decorator data
        fetch('https://unacoffeeshopbe.onrender.com/api/data/getDecoratorData')
            .then((response) => response.json())
            .then((data) => this.setState({ decoratorData: data }));
    }

    render() {
        const { match } = this.props;
        const { id } = match.params;
        const { itemData, decoratorData } = this.state;

        if (!itemData || decoratorData.length === 0) {
            return <div>Loading...</div>;
        }

        const { Name, Description, BasePrice, ImageURL, Decorators } = itemData;

        // Filter decorators based on group ID
        const decoratorOptions = Decorators.map((decorator) => {
            const groupDecorators = decoratorData.filter((item) => item.GroupID === decorator.GroupID);
            return {
                ...decorator,
                groupDecorators,
            };
        });

        return (
            <div>
                <h2>Item Page</h2>
                <p>Item ID: {id}</p>
                <h3>{Name}</h3>
                <p>{Description}</p>
                <p>Price: ${BasePrice.toFixed(2)}</p>
                <img src={ImageURL} alt={Name} />

                <h4>Decorators:</h4>
                <ul>
                    {decoratorOptions.map((decorator) => (
                        <li key={decorator.ID}>
                            <p>Type: {decorator.Type}</p>
                            <p>Name: {decorator.Name}</p>
                            <p>Price: ${decorator.Price.toFixed(2)}</p>
                            <p>Group ID: {decorator.GroupID}</p>
                            <p>Group Decorators:</p>
                            <ul>
                                {decorator.groupDecorators.map((groupDecorator) => (
                                    <li key={groupDecorator.ID}>
                                        <p>Type: {groupDecorator.Type}</p>
                                        <p>Name: {groupDecorator.Name}</p>
                                        <p>Price: ${groupDecorator.Price.toFixed(2)}</p>
                                        <p>Group ID: {groupDecorator.GroupID}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
