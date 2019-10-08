import React, {Component} from 'react';
import './App.css';
import web3 from './web3';

class App extends Component {
  render(){
    // window.ethereum.enable()
    //   .then(web3.eth.getAccounts()
    //     .then(console.log));

    web3.eth.getAccounts().then(console.log);
    
  return (
    <div>Olá, seu gay</div>
  );
}};
export default App;
