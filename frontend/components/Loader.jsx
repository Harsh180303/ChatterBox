import React, { useEffect } from 'react';
import './SpinnerLoader.css';

export default function Loader() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
    </div>
  );
}
