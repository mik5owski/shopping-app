import React, { Component } from 'react'

import "../css/ProductCard.css"

export class ProductCard extends Component {

    state = {
        quantity: 1,
        cartContent: this.props.cartContent
    }

    handleQuantityChange = (e) => {
        this.setState({
            quantity: e.target.value
        })  
    }


    addOneToProductQuantity = () => {
        this.setState({
            quantity: parseInt(this.state.quantity) + 1 || 1
        })
    }

    subtracktOneFromProductQuantity = () => {
        if(this.state.quantity > 0) {
            this.setState({
                quantity: this.state.quantity - 1
            })
        }
    }

    render() {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-xl mt-24 p-2 border border-gray-800">
                <div  
                    className="cursor-pointer"
                    onClick={() => this.props.showProductDetails(this.props.product)}
                >
                    <img 
                        className="w-full" 
                        src={this.props.product.images.primary.large} 
                        alt={this.props.product.general.name}
                    >
                    </img>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{this.props.product.general.name}</div> 
                    </div>
                    <div className="px-6">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Product id: {this.props.product.id}</span>
                    </div>
                </div>
                <div>
                    <div className="flex add-to-cart pt-2">
                        <div className="flex change-quantity">
                            <button 
                                className="bg-red-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-l"
                                onClick={this.subtracktOneFromProductQuantity}
                            >
                                -
                            </button>
                            <input 
                                className="quantity-input text-center bg-red-700 hover:bg-gray-800 text-white font-bold py-2 px-4"
                                value={this.state.quantity}
                                onChange={this.handleQuantityChange}
                            >
                            </input>
                            <button 
                                className="bg-red-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-r"
                                onClick={this.addOneToProductQuantity}
                            >
                                +
                            </button>
                        </div>
                        <div className="add-button-wrapper">
                            <button 
                                className="add-button bg-red-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                                onClick={() => this.props.addProductToCart(this.state.quantity, this.props.product)}
                            >
                                <div className="add-button-text">Add To Cart</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}