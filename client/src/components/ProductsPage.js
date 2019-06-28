import React, { Component } from 'react'
import { ProductDetails } from './ProductDetails'
import { ProductCard } from './ProductCard'
import { Cart } from './Cart'
import '../css/ProductsPage.css'

export class ProductsPage extends Component {

    state = {
        isShowingProductDetails: false,
        detailsOfProductShown: {},
        cartContent: [],
    }

    getCartFromLocalStorage = () => {
        const cartContetnFromStorage = localStorage.getItem('cart')
        const cartContent = JSON.parse(cartContetnFromStorage) || []
        this.setState({
            cartContent
        })
    }

    showProductDetails = (product) => {
        this.setState({
            isShowingProductDetails: true,
            detailsOfProductShown: product
        })
    }

    hideProductDetails = () => {
        this.setState({
            isShowingProductDetails: false
        })
    }

    componentDidMount() {
        this.getCartFromLocalStorage()
    }


    addProductToCart = (quantity, chosenProduct) => {
        if(quantity > 0 && quantity % 1 === 0) {

            const productAlreadyInCart = this.state.cartContent.find(product => product.name === chosenProduct.general.name)

            if(productAlreadyInCart) {
                const newQuantityOfProduct = parseInt(productAlreadyInCart.quantity) + parseInt(quantity)
                const cartWithoutProductAlreadyInCart = this.state.cartContent.filter(product => product.name !== chosenProduct.general.name)
                
                productAlreadyInCart.quantity = newQuantityOfProduct
                
                const newCartContent = cartWithoutProductAlreadyInCart.push(productAlreadyInCart)
                
                this.setState({
                    cartContent: newCartContent
                })
                
                localStorage.setItem('cart', JSON.stringify(this.state.cartContent))
                this.getCartFromLocalStorage()
            } else {
                this.setState({
                    cartContent: this.state.cartContent.push({
                        name: chosenProduct.general.name,
                        quantity: quantity
                    })
                })
                localStorage.setItem('cart', JSON.stringify(this.state.cartContent))
                this.getCartFromLocalStorage()
            }
        }
    }

    render() {
        return (
            <div className='wrapper'>
                {
                this.state.isShowingProductDetails
                ? <ProductDetails 
                    product={this.state.detailsOfProductShown} 
                    hideProductDetails={this.hideProductDetails}
                    cartContent={this.state.cartContent} 
                    getCartFromLocalStorage={this.getCartFromLocalStorage}
                    addProductToCart={this.addProductToCart}
                />
                : <div></div>
                }
                <div className="grid-wrapper">
                    <div  className='ProductsPageGrid'>
                        <div className='active-component left'>
                            {this.props.products
                                .filter((_, i) => (i % 2 === 0))
                                .map(product => (
                                    <ProductCard 
                                        key={product.id}
                                        product={product} 
                                        showProductDetails={this.showProductDetails} 
                                        cartContent={this.state.cartContent} 
                                        getCartFromLocalStorage={this.getCartFromLocalStorage}
                                        addProductToCart={this.addProductToCart}
                                    />
                                ))
                            }
                        </div>
                        <div className='active component right'>
                            {this.props.products
                                .filter((_, i) => (i % 2 !== 0))
                                .map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product} 
                                        showProductDetails={this.showProductDetails} 
                                        cartContent={this.state.cartContent} 
                                        getCartFromLocalStorage={this.getCartFromLocalStorage}
                                        addProductToCart={this.addProductToCart}
                                    />
                                ))
                            }  
                        </div>
                    </div>
                    <div>
                        <Cart 
                            cartContent={this.state.cartContent}
                        />
                    </div>
                </div>
            </div>
        )
    }
}