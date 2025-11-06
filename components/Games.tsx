import React from 'react';
import BottleGame from './BottleGame';

const Games: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-deep-tea-brown mb-4 text-center">Game Time!</h2>
      <BottleGame />
    </div>
  );
};

export default Games;