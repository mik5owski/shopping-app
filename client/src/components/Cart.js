import React, { Component } from 'react'

import '../css/Cart.css'

export class Cart extends Component {

    render() {
        return (
            <div className="cart-wrapper max-w-sm rounded overflow-hidden shadow-xl rounded">
                <div className="cart-title bg-gray-800  items-center text-white mr-6 font-semibold text-xl text-center tracking-tight rounded">
                    {`Shopping Cart: ${this.props.cartContent.length || 0} items.`}
                </div>
                
                    <ul className="cart-item-list">
                        {this.props.cartContent.map((product) => (
                            <li className="cart-item" key={product.name}>
                                <div>{product.name}</div>
                                <div>{`Quantity: ${product.quantity}`}</div>
                            </li>
                        ))}
                    </ul>
            </div>
        )
    }
}