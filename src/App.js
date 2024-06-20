import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ConnectButton from './components/ConnectButton';
import FriendInteraction from './components/FriendInteraction';
import MintButton from './components/MintButton';
import CutButton from './components/CutButton';
import TokenOfLoveABI from './TokenOfLoveABI.json'; 

const CONTRACT_ADDRESS = '0xfc4cfD17805dFE4BEf66A99E1aAe943B6294Ac21';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (provider && signer) {
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, TokenOfLoveABI, signer);
      setContract(contractInstance);
    }
  }, [provider, signer]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider (window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const account = signer.address;
        setProvider(provider);
        setSigner(signer);
        setAccount(account);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error("No Ethereum provider found. Install MetaMask.");
    }

  };

  return (
    <div className="App" style={{display:"flex" , justifyContent:"center" , alignItems:"center" , flexDirection:"column"}}>
      <h1 style={{color:"red"}}>Token Of Love</h1>
      <ConnectButton connectWallet={connectWallet} account={account} />
      {contract && <FriendInteraction contract={contract} account={account} />}
      {contract && <CutButton contract={contract} account={account} />}
      {contract && <MintButton contract={contract} />}
    </div>
  );
}

export default App;