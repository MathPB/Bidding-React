import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import bidding from './bidding';

class App extends Component {
  state = {
    organ: '',
    organName: '',
    message: '',
    name: '',
    value:''

  };

  async componentDidMount(){
    const organ = await bidding.methods.organ().call();
    const nameOrgan = await bidding.methods.nameOrgan().call();


    this.setState({ organ, nameOrgan});
  };

  onSubmit = async (event) =>{
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting transaction success...' });

    await bidding.methods.enter(this.state.name, this.state.value).send({ from: accounts[0], gas: '1000000'});

    this.setState({ message: 'You have been entered!' });
  };

  render(){   
  return (
    <div>
      <h2>Pregão Eletrônico</h2>
      <p>Orgão licitante: <b>{this.state.nameOrgan}</b></p>
      <p>Representado pelo endereço: <b>"{this.state.organ}"</b></p>
      <hr/>
      <form onSubmit={this.onSubmit}>
        <h2>Proposta</h2>
        <div>
          <label>Nome fantasia:</label>
          <br/>
          <input
            name = {this.state.name}
            onChange={event => this.setState({ value: event.target.name })}
          />
        </div>
        <div>
          <label>Valor da proposta:</label>
          <br/>
          <input
            value = {this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>
      <h1>{this.state.message}</h1>
    </div>
  );
}};
export default App;
