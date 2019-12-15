import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>My Portfolio</h2>
          {
        this.props.pstocks.map(stock => <Stock
        stock= {stock}
        key = {stock.id}
        handleClick = {this.props.removeStock}
  />) 
            
          }
      </div>
    );
  }

}

export default PortfolioContainer;
