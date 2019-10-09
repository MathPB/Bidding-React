import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import bidding from './bidding';

class App extends Component {
  constructor(props){
    super(props);

    this.state = { organ: '' };
  }

  async componentDidMount(){
    const organ = await bidding.methods.organ().call();

    this.setState({ organ });
  }

  render(){   
  return (
    <div>
      <h2>Pregão Eletrônico</h2>
      <p>Esse pregão foi implementado por: {this.state.manager}</p>
    </div>
  );
}};
export default App;
