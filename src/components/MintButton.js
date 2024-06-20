// src/components/MintButton.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MintButton.css';

const MintButton = ({ contract }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMint = async () => {
    setIsSubmitting(true);
    try {
      const tx = await contract.thoughtOfThem();
      await tx.wait();
      toast.success('Mint successful');
    } catch (error) {
      console.error('Error minting tokens:', error);
      toast.error('Error minting tokens');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mint-button-container">
      <ToastContainer />
      <button 
        onClick={handleMint} 
        disabled={isSubmitting}
        className="mint-button"
      >
        {isSubmitting ? 'Submitting...' : 'Mint Tokens'}
      </button>
    </div>
  );
};

export default MintButton;
