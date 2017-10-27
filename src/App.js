import React, { Component } from 'react';
import './assets/css/default.min.css';
import { getUsers, getProducts } from './actions/index';

class App extends Component {
  state = {products: []}

  componentDidMount() {
    getProducts().then((products) => {

      return this.setState({products});
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.products.map(product =>
          <div key={product.uid}>{product.name}</div>
        )}
      </div>
    );
  }
}

export default App;
