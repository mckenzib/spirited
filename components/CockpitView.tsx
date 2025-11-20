import React from 'react';
import { ObjectType } from '../types';

interface CockpitViewProps {
  objectType: ObjectType;
}

const CarCockpit: React.FC = () => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="dash" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a4a4a" />
        <stop offset="100%" stopColor="#2a2a2a" />
      </linearGradient>
    </defs>
    {/* Dashboard */}
    <path d="M0 600 L0 450 Q 100 440, 400 450 T 800 450 L800 600 Z" fill="url(#dash)" />
    {/* Steering Wheel */}
    <circle cx="400" cy="550" r="80" fill="#333" stroke="#111" strokeWidth="10" />
    <circle cx="400" cy="550" r="15" fill="#555" />
    <path d="M400 480 V 535 M400 565 V 620 M330 520 L385 550 M415 550 L470 520" stroke="#333" strokeWidth="10" />
  </svg>
);

const BoatCockpit: React.FC = () => (
  <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="boatbow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="boatdeck" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a52a2a" />
        <stop offset="100%" stopColor="#800000" />
      </linearGradient>
    </defs>
    {/* Bow */}
    <path d="M400,350 L0,600 H800 Z" fill="url(#boatbow)" />
    <path d="M400,380 L100,600 H700 Z" fill="url(#boatdeck)" />
    {/* Helm */}
    <circle cx="400" cy="800" r="150" fill="#a52a2a" stroke="#662200" strokeWidth="10" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line
        key={angle}
        x1="400"
        y1="800"
        x2={400 + 180 * Math.cos(angle * Math.PI / 180)}
        y2={800 + 180 * Math.sin(angle * Math.PI / 180)}
        stroke="#662200"
        strokeWidth="15"
      />
    ))}
    <circle cx="400" cy="800" r="20" fill="#DAA520" />
  </svg>
);

const AirplaneCockpit: React.FC = () => (
    <svg viewBox="0 0 800 600" className="w-full h-full">
    <defs>
      <linearGradient id="cockpitFrame" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6b7280" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
    </defs>
    {/* Window Frame */}
    <path d="M0,0 H800 V600 H0 V0 M50,50 V550 H750 V50 H50" fill="url(#cockpitFrame)" fillRule="evenodd" />
    {/* Yoke */}
    <path d="M350,600 V480 H450 V600" fill="#374151" />
    <path d="M300,480 H500 Q 450 420, 400 480 Q 350 420, 300 480 Z" fill="#374151" />
  </svg>
);

const renderCockpit = (type: ObjectType) => {
  switch (type) {
    case ObjectType.Car: return <CarCockpit />;
    case ObjectType.Boat: return <BoatCockpit />;
    case ObjectType.Airplane: return <AirplaneCockpit />;
    default: return null;
  }
};

const CockpitView: React.FC<CockpitViewProps> = ({ objectType }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {renderCockpit(objectType)}
    </div>
  );
};

export default CockpitView;
