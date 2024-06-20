import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FriendInteraction.css';

const FriendInteraction = ({ contract }) => {
  const [friendAddress, setFriendAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFriendSubmit = async () => {
    setIsSubmitting(true);
    try {
      const tx = await contract.weAreFriends(friendAddress);
      await tx.wait();
      toast.success('Friend interaction successful');
    } catch (error) {
      console.error('Error interacting with friend:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="friend-interaction">
      <ToastContainer />
      <input
        type="text"
        value={friendAddress}
        onChange={(e) => setFriendAddress(e.target.value)}
        placeholder="Friend's Address"
        className="friend-input"
      />
      <button 
        onClick={handleFriendSubmit} 
        disabled={isSubmitting}
        className="friend-submit-button"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Friend'}
      </button>
    </div>
  );
};

export default FriendInteraction;
