
import React from 'react';
import type { Vector2D } from '../types';

interface SpiritProps {
  position: Vector2D;
}

const Spirit: React.FC<SpiritProps> = ({ position }) => {
  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: `${position.x - 20}px`,
        top: `${position.y - 20}px`,
        width: '40px',
        height: '40px',
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
        <div className="absolute w-full h-full rounded-full bg-cyan-400/30 filter blur-sm animate-pulse" />
        <div className="absolute w-6 h-6 bg-cyan-100 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        {/* Trail effect could go here */}
      </div>
    </div>
  );
};

export default Spirit;
