import React from 'react';
import './ConnectButton.css';

const ConnectButton = ({ connectWallet, account }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {account ? (
        <p style={{ color: 'green' }}>Connected as: {account}</p>
      ) : (
        <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectButton;
