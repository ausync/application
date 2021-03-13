import logo from './logo.svg';
import './App.css';
import React, { Component,useEffect,useState,useRef } from 'react';
import Web3 from 'web3';
import Vote from './Vote'
import Audio from './Audio'

function App() {
  const [contract, setContract ] = useState(null);
  const [account, setAccount ] = useState(null);

  useEffect(async () => {
        const votingArtifact = require("./contracts/Voting.json");
        window.web3 = null;
        if (window.ethereum) {
            // use MetaMask's provider
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable(); // get permission to access accounts
        } else {
            console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. Remove this fallback when you deploy live");
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            window.web3 = new Web3(
              //new Web3.providers.HttpProvider('http://localhost:8545')
              new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/096d84c49a584f15805ed36a61846be7"),
            );
        }

        //const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
        window.web3.eth.getBlock('latest').then(console.log);

        const networkId = await window.web3.eth.net.getId();
        const deployedNetwork = votingArtifact.networks[networkId];
        setContract(new window.web3.eth.Contract(
            votingArtifact.abi,
            deployedNetwork.address,
        ));

        // get accounts
        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log("Logged account: ", accounts[0]);
    }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Vote contract={contract} account={account} />
      <Audio />
    </div>
  );
}

export default App;
