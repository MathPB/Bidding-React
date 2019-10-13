import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import bidding from './bidding';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends Component {
  state = {
    organ: '',
    organName: '',
    message: '',
    value:'',
    id:'',
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

    window.location.reload();
  };

  onClick = async () =>{
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Aguardando a aprovação da transação...' }); 

    await bidding.methods.nameWinner().send({ from: accounts[0] });

    this.setState({ message: 'Trasação aprovada!' });

    window.location.reload();
  }

  render(){   
  return (
    <div className="App App-header">
      <h2 className="preg">Pregão Eletrônico</h2>
      <br/>
      <br/>
      <Container>
        <Row>
          <Col>
            <p><b>Orgão licitante:</b> {this.state.nameOrgan}</p>
            {/* <p><b>Representado pelo endereço: </b><font face size="2">{this.state.organ}</font></p> */}
          </Col>
          <Col>
            <p><b>Participantes:</b> {this.state.getProvider.length}</p>
            
          </Col>
          <Col>
            <p><b>Menor proposta:</b> {this.state.minimum}</p>
          </Col>
        </Row>
      </Container>
      <form onSubmit={this.onSubmit}>
        <br/>
        <h2 className="prop">Proposta</h2>
        <br/>
        <Container>
        <Row>
          <Col>
          <div>
            <label className="label-name">Nome fantasia</label>
            <br/>
            <input className="input-name"
              id = {this.state.value}
              onChange={event => this.setState({ id : event.target.value})}
            />
            </div>
            <br/>
          </Col>
          <Col>
            <div>
            <label className="label-prop">Valor da proposta</label>
            <br/>
            <input className='input-prop'
              value = {this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            </div>
          </Col>
        </Row>
      </Container>
        <br/> 
        <button className="btn-enter">Entrar</button>
      </form>
      <hr/>
      <button className="btn-vencedor" onClick={this.onClick}>Vencedor</button>
      <br/>
      <b>{this.state.vencedor}</b>
      <br/>
      <h1>{this.state.message}</h1>
    </div>
  );
}};
export default App;
