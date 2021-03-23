import './App.css';
import React, { Component,useEffect,useState,useRef } from 'react';
import Web3 from 'web3';
import AudioDetail from './Audio'
import Mixer from './Mixer'
import TopSongs from './TopSongs'
import Layout from './Layout'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [contract, setContract ] = useState(null);
  const [account, setAccount ] = useState(null);

  useEffect(async () => {
        const audioArtifact = require("./contracts/Audio.json");
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
        const deployedNetwork = audioArtifact.networks[networkId];
        setContract(new window.web3.eth.Contract(
            audioArtifact.abi,
            deployedNetwork.address,
        ));

        // get accounts
        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log("Logged account: ", accounts[0]);
    }, []);


  return (
  <BrowserRouter>
    <Layout>
        <Switch>
            <Route exact path="/audio/:audioId" render={(props) => <AudioDetail contract={contract} {...props} /> } />
            <Route path="/song" component={Audio} />
            <Route path="/mixer" render={(props) => <Mixer account={account} contract={contract} {...props} /> } />
            <Route path="/" render={(props) => <TopSongs contract={contract} {...props} /> }/>
        </Switch>
     </Layout>
  </BrowserRouter>
  );
}

export default App;
