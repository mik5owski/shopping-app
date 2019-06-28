import React, { Component } from 'react'
import { ProductsPage } from './ProductsPage'

import "../css/SearchedProducts.css"

export class SearchedProducts extends Component {

    _isMounted = false

    state = {
        products: [],
        searchQueryValue: this.props.searchQueryValue
    }

    getProductsFromSearch = () => {
        fetch('http://localhost:3005/products?q=' + this.state.searchQueryValue + "&_limit=999999999")
            .then(response => response.json())
            .then(products => {
                if (this._isMounted) {
                    this.setState({
                        ...this.state,
                        products
                    })
                }
            })
    }

    componentDidMount() {
        this._isMounted = true
        this.getProductsFromSearch()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return(
            <div>
                {this.state.products.length > 0
                ? <ProductsPage 
                    products={this.state.products} 
                    cartContent={this.props.cartContent} 
                    getCartFromLocalStorage={this.props.getCartFromLocalStorage}
                />
                : <div>
                    <ProductsPage 
                        products={this.state.products} 
                        cartContent={this.props.cartContent} 
                        getCartFromLocalStorage={this.props.getCartFromLocalStorage}
                    />
                    <div className="notification">
                        <p className="bg-gray-800 text-white font-bold py-2 px-4 rounded py-4 text-center">
                            Sorry, this search provided no results.
                        </p>
                    </div>  
                </div>}
            </div>
        )
    }
}
