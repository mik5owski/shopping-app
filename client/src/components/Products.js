import React, { Component } from 'react'
import { ProductsPage } from './ProductsPage'

import '../css/Products.css'
export class Products extends Component {

    _isMounted = false;

    state = {
        products: [],
        pageNumber: 1,
        numberOfPages: null
    }
  
    getProducts = () => {
        fetch('http://localhost:3005/products?_page=' + this.state.pageNumber)
        .then(response => response.json())
        .then(products => {
            if(this._isMounted) {
                this.setState({
                    ...this.state,
                    products
                })
            }
        })   
    }

    getNumberOfProducts = () => {
        fetch('http://localhost:3005/products?_limit=' + 99999999999)
        .then(response => response.json())
        .then(products => {
            if(this._isMounted) {
                this.setState({
                ...this.state,
                numberOfPages: Math.ceil(products.length/10)
                })
            }
        })
    }

    goToNextPage = async () => {
        if(this._isMounted) {
            if(this.state.pageNumber < this.state.numberOfPages) {
                await this.setState({
                    ...this.state,
                    pageNumber: this.state.pageNumber + 1
                })
                await this.getProducts()
            }
        }
    }

    goToPrevPage = async () => {
        if(this._isMounted) {
            if(this.state.pageNumber > 1) {
                await this.setState({
                    ...this.state,
                    pageNumber: this.state.pageNumber - 1
                })
                await this.getProducts()
            }
        }
    }

    componentDidMount() {
        this._isMounted = true
        if(this.state.numberOfPages === null) this.getNumberOfProducts()
        this.getProducts()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <div>
                <div id="top"></div>
                <ProductsPage 
                    products={this.state.products} 
                    cartContent={this.props.cartContent} 
                    getCartFromLocalStorage={this.props.getCartFromLocalStorage}
                />
                <div className="text-center changer page-changer-bottom-right">
                    <div className="inline-flex pt-2">
                        <a href="#top"><button 
                            className="bg-red-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-l"
                            onClick={this.goToPrevPage}
                        >
                            Prev
                        </button></a>
                        <div className="bg-red-700 text-white font-bold py-2 px-4">
                            {`${this.state.pageNumber}/${this.state.numberOfPages}`}
                        </div>
                        <a href="#top"><button 
                            className="bg-red-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-r"
                            onClick={this.goToNextPage}
                        >
                            Next
                        </button></a>
                    </div>
                </div>
            </div>
        )
    }
}