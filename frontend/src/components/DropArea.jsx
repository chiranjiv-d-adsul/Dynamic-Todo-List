import React, { useState } from 'react';

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setShowDrop(false);
    onDrop();
  };

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()} // Required to allow drop
      className={`p-4 rounded shadow  flex justify-between items-center transition-all duration-200 ease-in-out ${showDrop ? 'bg-white opacity-1' : 'opacity-0'}`}
    >
      {showDrop && <div>Drop Here</div>}
    </section>
  );
};

export default DropArea;