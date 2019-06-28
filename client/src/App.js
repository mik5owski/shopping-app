import React, { Component } from 'react';
import { Nav } from './components/Nav';
import { Products } from './components/Products';
import { Route } from 'react-router-dom'
import { SearchedProducts } from './components/SearchedProducts';

import './css/App.css'

class App extends Component {
  
  state = {
    searchQueryValue: null,
    isShowingCart: false
  }

  getSearchQueryValue = (searchQueryValue) => {
    this.setState({
      searchQueryValue
    })
  }

  toggleShowingCartContent = () => {
    
    const content = document.querySelector('.Content')
    const cart = document.querySelector('.Cart')
  
    if(content.classList.contains("is-showing-cart")) {
      const pageChanger = document.querySelector('.page-changer-bottom-right')
      content.classList.remove("is-showing-cart")
      cart.style.display = "none"
      if(pageChanger !== null) {
        pageChanger.classList.add("page-changer")
        pageChanger.classList.remove("page-changer-bottom-right")
      }
      this.setState({
        isShowingCart: false
      })
    } else {
      const pageChanger = document.querySelector('.page-changer')

      content.classList.add("is-showing-cart")
      cart.style.display = "block";
      if(pageChanger !== null) {
        pageChanger.classList.add("page-changer-bottom-right")
        pageChanger.classList.remove("page-changer")
      }
      this.setState({
        isShowingCart: true
      })
    }
  }

  render(){
    return (
      <div className="App">
        <div className="Nav">
          <Nav 
            getSearchQueryValue={this.getSearchQueryValue} 
            toggleShowingCartContent={this.toggleShowingCartContent}
          />
        </div>
        <div className='Content'>
          <div className="MainContent">
            <Route exact path='/' 
              component={() => <Products 
                cartContent={this.state.cartContent} 
                getCartFromLocalStorage={this.getCartFromLocalStorage}
                isShowingCart={this.state.isShowingCart}
              />}
            >
            </Route>
            <Route exact path='/products' 
              component={() => <Products 
                cartContent={this.state.cartContent} 
                getCartFromLocalStorage={this.getCartFromLocalStorage}
                isShowingCart={this.state.isShowingCart}
              />}
            >
            </Route>
            <Route path='/products/searched_products/:q' 
              component={() => <SearchedProducts 
                searchQueryValue={this.state.searchQueryValue} 
                cartContent={this.state.cartContent} 
                getCartFromLocalStorage={this.getCartFromLocalStorage}/>} 
              >
            </Route>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
