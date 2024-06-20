import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CutButton.css';

const CutButton = ({ contract }) => {
  const [friendAddress, setFriendAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCut = async () => {
    setIsSubmitting(true);
    try {
      const tx = await contract.weCut(friendAddress);
      await tx.wait(); 
      toast.success('Cut successful');
    } catch (error) {
      console.error('Error cutting friendship:', error);
      toast.error('Error cutting friendship make sure u r friends before cutting or double check the address!'  ,error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cut-friendship">
      <ToastContainer />
      <input
        type="text"
        value={friendAddress}
        onChange={(e) => setFriendAddress(e.target.value)}
        placeholder="Friend's Address"
        className="cut-input"
      />
      <button 
        onClick={handleCut} 
        disabled={isSubmitting}
        className="cut-submit-button"
      >
        {isSubmitting ? 'Submitting...' : 'Cut Friendship'}
      </button>
    </div>
  );
};

export default CutButton;
