
import React, { useState, useMemo } from 'react';

const BottleSVG: React.FC<{ rotation: number }> = ({ rotation }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 300"
    style={{
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 4.5s cubic-bezier(0.33, 1, 0.68, 1)',
    }}
    className="h-40 w-auto text-deep-tea-brown drop-shadow-lg z-10"
  >
    {/* Bottle Body */}
    <path
      d="M30,300 L30,120 C30,100 70,100 70,120 L70,300 Z"
      fill="currentColor"
    />
    {/* Bottle Neck */}
    <path
      d="M40,120 L40,40 C40,20 60,20 60,40 L60,120 Z"
      fill="currentColor"
    />
    {/* Bottle Cap */}
    <rect x="35" y="10" width="30" height="15" rx="5" fill="currentColor" />
    {/* Shine/Highlight */}
    <path d="M38,280 L38,130 C45,150 45,250 38,280 Z" fill="white" fillOpacity="0.3" />
  </svg>
);


const BottleGame: React.FC = () => {
  const [step, setStep] = useState<'select' | 'setup' | 'play'>('select');
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [consequence, setConsequence] = useState<string>('');
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  
  const canStartGame = useMemo(() => 
    players.length > 0 && 
    players.every(p => p.trim() !== '') && 
    consequence.trim() !== '',
  [players, consequence]);


  const handleNumPlayersSelect = (num: number) => {
    setNumPlayers(num);
    setPlayers(Array(num).fill(''));
    setStep('setup');
    setError('');
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
    if (error) setError('');
  };

  const handleStartGame = () => {
    if (!canStartGame) {
      setError('Please enter all player names and set a challenge.');
      return;
    }
    setError('');
    setStep('play');
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);
    setWinnerIndex(null);

    const randomSpins = Math.floor(Math.random() * 5) + 5;
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = rotation + (randomSpins * 360) + randomAngle;
    setRotation(newRotation);

    setTimeout(() => {
      const segmentAngle = 360 / numPlayers;
      const finalBottleRotation = newRotation % 360;
      
      // The winner is determined by the direction the cap of the bottle is pointing.
      // We add 180 degrees to the bottle's final rotation angle to ensure the cap, 
      // not the base, correctly selects the winner.
      const winningAngle = (finalBottleRotation + 180) % 360;

      const boardStartAngle = 360 - (segmentAngle / 2);
      const relativeAngle = (winningAngle - boardStartAngle + 360) % 360;
      
      const calculatedIndex = Math.floor(relativeAngle / segmentAngle);

      setWinner(players[calculatedIndex]);
      setWinnerIndex(calculatedIndex);
      setIsSpinning(false);
    }, 4500);
  };
  
  const resetGame = () => {
      setStep('select');
      setNumPlayers(0);
      setPlayers([]);
      setConsequence('');
      setRotation(0);
      setIsSpinning(false);
      setWinner(null);
      setWinnerIndex(null);
      setError('');
  };

  const renderSetup = () => {
      switch(step) {
          case 'select':
              return (
                  <>
                    <p className="text-charcoal-gray mb-6 text-lg">How many friends are playing?</p>
                    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                      {[2, 3, 4, 5, 6].map(num => (
                        <button key={num} onClick={() => handleNumPlayersSelect(num)} className="w-20 h-20 mx-auto bg-button-cream text-deep-tea-brown font-bold text-3xl rounded-full shadow-md hover:bg-opacity-80 hover:scale-110 transition-all duration-200">
                          {num}
                        </button>
                      ))}
                    </div>
                  </>
              );
          case 'setup':
              return (
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-deep-tea-brown mb-3">1. Enter Player Names</h4>
                  <div className="space-y-3 mb-6">
                    {players.map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder={`Player ${index + 1}`}
                        value={players[index]}
                        onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border-2 border-button-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-tea-brown transition"
                      />
                    ))}
                  </div>

                  <h4 className="text-lg font-semibold text-deep-tea-brown mb-3">2. Set the Challenge</h4>
                   <p className="text-sm text-charcoal-gray mb-3">What does the chosen player have to do?</p>
                  <input
                    type="text"
                    placeholder="e.g., Pay for the next round"
                    value={consequence}
                    onChange={(e) => setConsequence(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-2 border-button-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-tea-brown transition"
                  />
                  <div className="flex flex-wrap gap-2 justify-center mt-4 mb-6">
                      {['Pay the bill', 'Truth or dare', 'Sing a song'].map(suggestion => (
                          <button key={suggestion} onClick={() => setConsequence(suggestion)} className="bg-button-cream text-deep-tea-brown text-sm font-semibold py-1.5 px-3 rounded-full hover:bg-opacity-80 transition">
                            {suggestion}
                          </button>
                      ))}
                  </div>

                  {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                  
                  <div className="text-center">
                    <button 
                      onClick={handleStartGame}
                      disabled={!canStartGame}
                      className="w-full bg-deep-tea-brown text-white font-bold py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95"
                    >
                      Let's Play!
                    </button>
                    <button onClick={() => setStep('select')} className="text-sm text-charcoal-gray mt-4 hover:underline">
                      Back
                    </button>
                  </div>
                </div>
              );
          default:
              return null;
      }
  }

  if (step !== 'play') {
    return (
      <div className="bg-light-cream p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-deep-tea-brown mb-4 text-center">Spin the Bottle Setup</h3>
        {renderSetup()}
      </div>
    );
  }

  const segmentAngle = 360 / numPlayers;
  const boardStartAngle = 360 - segmentAngle / 2;
  const boardColors = ['#D4A373', '#FAEDCD', '#FEFAE0', '#E9EDC9', '#CCD5AE', '#A2A88A'];
  const gap = 1.5;

  const calculateArcTextProperties = (name: string, numPlayers: number) => {
    const ARC_RADIUS = 125;
    const SIDE_PADDING_FACTOR = 0.8;
    const segmentAngleRad = (360 / numPlayers) * (Math.PI / 180);
    const availableArcLength = ARC_RADIUS * segmentAngleRad * SIDE_PADDING_FACTOR;
    const estimatedFontSize = availableArcLength / ((name.length || 1) * 0.6);
    const baseFontSize = 24;
    let finalFontSize = Math.min(baseFontSize, estimatedFontSize);
    finalFontSize = Math.max(finalFontSize, 10);
    return { fontSize: finalFontSize };
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number, isBottomHalf: boolean) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const sweepFlag = isBottomHalf ? '0' : '1';
    if (isBottomHalf) {
       return `M ${end.x} ${end.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${start.x} ${start.y}`;
    }
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  };


  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-light-cream rounded-2xl shadow-inner">
      <div 
        className="w-full max-w-xs aspect-square rounded-full relative border-8 border-deep-tea-brown shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] flex justify-center items-center overflow-hidden"
        style={{
            background: `conic-gradient(from ${boardStartAngle}deg, ${players.map((_, i) => 
                `${boardColors[i % boardColors.length]} ${i * segmentAngle + gap/2}deg ${(i + 1) * segmentAngle - gap/2}deg`
            ).join(', ')})`
        }}
      >
        <BottleSVG rotation={rotation} />
        
        <svg
          viewBox="-150 -150 300 300"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          <defs>
            {players.map((_, index) => {
              const ARC_RADIUS = 125;
              const SIDE_PADDING_PERCENT = 0.10;
              const paddingAngle = segmentAngle * SIDE_PADDING_PERCENT;
              const pathStartAngle = boardStartAngle + (index * segmentAngle) + paddingAngle;
              const pathEndAngle = boardStartAngle + ((index + 1) * segmentAngle) - paddingAngle;
              const midAngle = (pathStartAngle + pathEndAngle) / 2;
              const normalizedMidAngle = (midAngle % 360 + 360) % 360;
              const isBottomHalf = normalizedMidAngle > 90 && normalizedMidAngle < 270;
              const pathData = describeArc(0, 0, ARC_RADIUS, pathStartAngle, pathEndAngle, isBottomHalf);
              return <path id={`player-path-${index}`} d={pathData} fill="none" key={index} />;
            })}
          </defs>

          {players.map((name, index) => {
            const isWinner = winnerIndex === index;
            const pathId = `player-path-${index}`;
            const { fontSize } = calculateArcTextProperties(name, numPlayers);

            return (
              <text
                key={index}
                className={`transition-all duration-500 fill-current ${isWinner ? 'text-amber-900 font-extrabold' : 'text-deep-tea-brown font-semibold'}`}
                style={{
                  fontSize: isWinner ? fontSize * 1.3 : fontSize,
                  textShadow: isWinner ? '0 0 12px rgba(255, 223, 128, 1), 0 0 5px rgba(0,0,0,0.5)' : '0 1px 1px rgba(255,255,255,0.4)',
                }}
              >
                <textPath
                  href={`#${pathId}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {name}
                </textPath>
              </text>
            );
          })}
        </svg>
      </div>
      
      <div className="text-center h-24 flex flex-col justify-center items-center px-2">
        {winner && !isSpinning && (
            <div className="animate-bounce">
                <p className="text-2xl font-bold text-deep-tea-brown">Congratulations, {winner}!</p>
                <p className="text-xl text-charcoal-gray mt-1 break-words">You have to: <span className="font-semibold">{consequence}</span></p>
            </div>
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button 
          onClick={handleSpin} 
          disabled={isSpinning}
          className="w-full max-w-xs bg-deep-tea-brown text-white font-bold py-4 px-10 text-xl rounded-lg shadow-md hover:bg-opacity-90 active:scale-95 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Spinning...' : 'Spin the Bottle!'}
        </button>
         <button onClick={resetGame} className="text-sm text-charcoal-gray hover:underline">
           Start a New Game
         </button>
      </div>
    </div>
  );
};

export default BottleGame;
