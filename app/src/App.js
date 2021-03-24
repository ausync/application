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
  const [onlyRopsten, setOnlyRopsten ] = useState(false);

  useEffect(async () => {
        const audioArtifact = require("./contracts/Audio.json");
        window.web3 = null;
        if (window.ethereum) {
            // use MetaMask's provider
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable(); // get permission to access accounts
        } else {
            console.warn("No web3 detected. Falling back to a random public node");
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            window.web3 = new Web3(
              new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA),
            );
        }

        //const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
        window.web3.eth.getBlock('latest').then(console.log);

        const networkId = await window.web3.eth.net.getId();
        const deployedNetwork = audioArtifact.networks[networkId];
        if (deployedNetwork) {
            setContract(new window.web3.eth.Contract(
                audioArtifact.abi,
                deployedNetwork.address,
            ));

            // get accounts
            const accounts = await window.web3.eth.getAccounts();
            setAccount(accounts[0]);
            console.log("Logged account: ", accounts[0]);
        } else {
            setOnlyRopsten(true);
        }
    }, []);


  return (
  <BrowserRouter>
    <Layout>
        {(onlyRopsten) ?
        <div className="alert alert-danger" role="alert">
              You are not connected to Ropsten test network, please select it from MetaMask or use incognito mode
        </div> :
        <Switch>
            <Route exact path="/audio/:audioId" render={(props) => <AudioDetail contract={contract} {...props} /> } />
            <Route path="/song" component={Audio} />
            <Route path="/mixer" render={(props) => <Mixer account={account} contract={contract} {...props} /> } />
            <Route path="/" render={(props) => <TopSongs contract={contract} {...props} /> }/>
        </Switch>
        }
     </Layout>
  </BrowserRouter>
  );
}

export default App;
