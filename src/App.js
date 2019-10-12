import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import bidding from './bidding';

class App extends Component {
  state = {
    organ: '',
    organName: '',
    message: '',
    value:'',
    nodeName:'',
    getProvider: [],
    minimum:'',
    endereco:'',
    vencedor:'',

  };

  async componentDidMount(){
    const organ = await bidding.methods.organ().call();
    const nameOrgan = await bidding.methods.nameOrgan().call();
    const getProvider = await bidding.methods.getProviders().call();
    const minimum = await bidding.methods.minimum().call();
    const endereco = await bidding.methods.endereco().call();
    const vencedor = await bidding.methods.vencedor().call();

    this.setState({ organ, nameOrgan, getProvider, minimum, endereco, vencedor});
  };

  onSubmit = async (event) =>{
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Aguardando a aprovação da transação...' });

    await bidding.methods.enter(this.state.id, this.state.value).send({ from: accounts[0], gas: '1000000'});

    this.setState({ message: 'Proposta enviada com sucesso!!' });

    await bidding.methods.lowestOffer().send({ from: accounts[0], gas: '1000000' });

    this.setState({ message: 'Trasação aprovada!' });
  };

  onClick = async () =>{
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Aguardando a aprovação da transação...' }); 

    await bidding.methods.addrWinner().send({ from: accounts[0] });

    this.setState({ message: 'Trasação aprovada!' });

    this.setState({ message: 'Aguardando a aprovação da transação...' }); 

    await bidding.methods.nameWinner().send({ from: accounts[0] });

    this.setState({ message: 'Trasação aprovada!' });
  }

  render(){   
  return (
    <div>
        console.log({this.state.nodeName});
      <h2>Pregão Eletrônico</h2>
      <p>Orgão licitante: <b>{this.state.nameOrgan}</b></p>
      <p>Representado pelo endereço: <b>"{this.state.organ}"</b></p>
      <p>Participantes: <b>{this.state.getProvider.length}</b></p>
      <p>Menor proposta:{this.state.minimum}</p>
      <hr/>
      <form onSubmit={this.onSubmit}>
        <h2>Proposta</h2>
        <div>
          <label>Nome fantasia:</label>
          <br/>
          <input
            id = {this.state.id}
            onChange={event => this.setState({ id : event.target.id})}
          />
        </div>
        <div>
          <br/>
          <label>Valor da proposta:</label>
          <br/>
          <input
            value = {this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </div>
        <br/> 
        <button bsStyle="primary">Enter</button>
      </form>
      <hr/>
      <h2>Encerrar o leilão</h2>
      <button onClick={this.onClick}>Vencedor</button>
      <br/>
      <b>{this.state.vencedor}</b>
      <br/>
      <b>{this.state.endereco}</b>
      <h1>{this.state.message}</h1>
    </div>
  );
}};
export default App;
