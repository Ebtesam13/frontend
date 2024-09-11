import React, { useEffect } from 'react';
import './Message.css'; // Make sure to create this CSS file

const Message = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // 3000ms = 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`message ${type}`}>
      <div className="message-content">
        <span className="message-text">{message}</span>
        <button onClick={onClose} className="close-button">x</button>
      </div>
    </div>
  );
};

export default Message;
