import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [], 
    filterTerm: "All",
    sortTerm: ""
  }

  buyStock = (stock) => {
     this.setState((prevState) => {
       return {
       portfolio: [stock, ...prevState.portfolio]
       }
     }
     
     )
  }

  setSortTerm = (event) => {
   let sortTerm = event
    this.setState( {
      sortTerm: sortTerm
  }
  )
  }

  setFilterTerm = (event) => {
    let term = event
    console.log(term);
    this.setState( {
        filterTerm: term
    }
    )
  }

  whichStocksToRender = () => {
    let copiedStocks = [...this.state.stocks]

    if (this.state.filterTerm === "All")
    {copiedStocks = [...this.state.stocks]}

  else  {copiedStocks = this.state.stocks.filter(stock => stock.type === this.state.filterTerm)}

if (this.state.sortTerm === "Price") {
  copiedStocks.sort((stockA, stockB) => {
   return stockA.price - stockB.price
  })  
} else if (this.state.sortTerm === "Alphabetically") {
      copiedStocks.sort((stockA, stockB) => {
        return stockA.name.localeCompare(stockB.name)
      })
    }
  return copiedStocks
    
  }
  removeStock = (stock) => {

    let index = this.state.portfolio.indexOf(stock)
    
    let stocks = [...this.state.portfolio]
    stocks.splice(index, 1)
    // console.log(stocks)
    this.setState((prevState) => {
      return {
      portfolio: stocks
      }
    }
    )
  }

  componentDidMount(){
    fetch(`http://localhost:3000/stocks`)
    .then(resp => resp.json())
    .then(stocksObj => 
      this.setState({
       stocks: stocksObj
      })
      )
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <SearchBar

        setFilterTerm = {this.setFilterTerm}
        filterTerm = {this.state.filterTerm}
        setSortTerm = {this.setSortTerm}
        sortTerm = {this.state.sortTerm}
        
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
              stocks={this.whichStocksToRender()}
              buyStock = {this.buyStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer 
              pstocks={this.state.portfolio}
              removeStock = {this.removeStock}
              />


            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
