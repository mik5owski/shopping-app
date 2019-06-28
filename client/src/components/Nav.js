import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Nav.css'

export class Nav extends Component {

    state = {
        searchQueryValue: 'empty string'
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            this.props.getSearchQueryValue(this.state.searchQueryValue)
            const searchButton = document.querySelector('.search-button')
            searchButton.click()
        }
      }

    handleSearchButtonClick = () => {
        this.props.getSearchQueryValue(this.state.searchQueryValue)
    }

    handleSearchInputChange = (e) => {
        this.setState({
            searchQueryValue: e.target.value
        })
        if(e.target.value === '') {
            this.setState({
                searchQueryValue: 'empty string'
            })
        }
    }

    render() {
        return (
            <nav className="nav flex items-center justify-between flex-wrap bg-red-700 p-6">
                <div className="flex">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <div className='logo'></div>
                        <Link to='/'><span className="font-semibold text-xl tracking-tight">Office</span></Link>
                        </div>
                    <div>
                        <Link to='/products'>
                            <button 
                                className="bg-white mx-5 hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
                                onClick={this.clearSearchQuery}
                            >
                                Products
                            </button>
                        </Link>
                    </div>
                    
                </div>
                <div>
                <form 
                        className="flex"
                    >
                        <input 
                            className="mx-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            placeholder="Search..."
                            onChange={(e) => this.handleSearchInputChange(e)}
                            value={this.state.searchQuery}
                            onKeyPress={(e) => this.keyPressed(e)}
                        >    
                        </input>
                        
                            <button
                                onClick={(e) => this.handleSearchButtonClick(e)}
                            >
                            <Link 
                                to={`/products/searched_products/${this.state.searchQueryValue}`}
                            >
                                <div className="search-button bg-white hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded">
                                    Search
                                </div>
                            </Link>
                            </button>
                    </form>
                </div>
            </nav>
        )
    }
}