import "./CustomAlert.css";
import React, { useState, useEffect } from "react";

const CustomAlert = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!show) return null;

  return (
    <div className={`customAlert ${type}`} onClick={() => setShow(!show)}>
      {message}
    </div>
  );
};

export default CustomAlert;
