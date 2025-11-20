
import React from 'react';
import type { PossessableObjectState } from '../types';
import { ObjectType } from '../types';

interface ObjectRendererProps {
  object: PossessableObjectState;
  isPossessed: boolean;
  style?: React.CSSProperties;
  isHovered: boolean;
}

const Car: React.FC = () => (
  <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="carRed" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="carGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="60" cy="50" rx="55" ry="10" fill="black" opacity="0.3" />
    {/* Tires */}
    <rect x="15" y="40" width="20" height="12" rx="4" fill="#1f2937" />
    <rect x="85" y="40" width="20" height="12" rx="4" fill="#1f2937" />
    <rect x="15" y="8" width="20" height="12" rx="4" fill="#1f2937" />
    <rect x="85" y="8" width="20" height="12" rx="4" fill="#1f2937" />
    {/* Body Main */}
    <path d="M 10 45 L 5 25 L 10 10 H 30 L 40 5 H 90 L 115 15 L 115 45 L 90 55 H 30 L 10 45 Z" fill="url(#carRed)" stroke="#7f1d1d" strokeWidth="1" />
    {/* Cabin/Window */}
    <path d="M 35 12 L 42 8 H 80 L 85 12 H 85 V 48 H 85 L 80 52 H 42 L 35 48 Z" fill="url(#carGlass)" />
    {/* Headlights */}
    <path d="M 113 18 L 116 20 V 40 L 113 42 Z" fill="#fef08a" filter="blur(1px)" />
    {/* Spoiler */}
    <rect x="2" y="15" width="6" height="30" fill="#7f1d1d" rx="2" />
  </svg>
);

const Motorcycle: React.FC = () => (
  <svg viewBox="0 0 80 30" className="w-full h-full drop-shadow-lg">
    {/* Shadow */}
    <ellipse cx="40" cy="20" rx="35" ry="8" fill="black" opacity="0.3" />
    {/* Wheels */}
    <rect x="5" y="5" width="15" height="20" rx="4" fill="#1f2937" />
    <rect x="60" y="5" width="15" height="20" rx="4" fill="#1f2937" />
    {/* Body */}
    <path d="M 20 10 L 50 8 L 60 12 L 50 22 L 20 20 Z" fill="#e11d48" stroke="#881337" />
    <circle cx="45" cy="15" r="8" fill="#111827" /> {/* Seat */}
    {/* Handlebars */}
    <path d="M 55 5 L 55 25" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    {/* Headlight */}
    <path d="M 62 12 L 65 15 L 62 18 Z" fill="#fef08a" />
  </svg>
);

const Boat: React.FC = () => (
  <svg viewBox="0 0 140 60" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="boatWood" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
    </defs>
     {/* Wake */}
    <path d="M 0 30 Q -20 10, -50 5 M 0 30 Q -20 50, -50 55" stroke="white" strokeWidth="2" opacity="0.5" fill="none" />
    {/* Hull */}
    <path d="M 10 15 L 100 15 L 135 30 L 100 45 L 10 45 L 5 30 Z" fill="url(#boatWood)" stroke="#451a03" strokeWidth="1"/>
    {/* Deck Detail */}
    <rect x="20" y="20" width="60" height="20" rx="4" fill="#fff7ed" />
    <circle cx="40" cy="30" r="5" fill="#0ea5e9" />
    {/* Motor */}
    <rect x="0" y="22" width="12" height="16" fill="#1e293b" />
  </svg>
);

const Deer: React.FC = () => (
  <svg viewBox="0 0 80 40" className="w-full h-full drop-shadow-lg">
     {/* Legs (subtle) */}
     <ellipse cx="20" cy="10" rx="5" ry="8" fill="#5D4037" />
     <ellipse cx="20" cy="30" rx="5" ry="8" fill="#5D4037" />
     <ellipse cx="60" cy="10" rx="5" ry="8" fill="#5D4037" />
     <ellipse cx="60" cy="30" rx="5" ry="8" fill="#5D4037" />
     {/* Body */}
     <ellipse cx="40" cy="20" rx="30" ry="14" fill="#8D6E63" />
     {/* Tail */}
     <path d="M 12 20 Q 8 15, 5 20 Q 8 25, 12 20" fill="#FFF" />
     {/* Neck/Head Area */}
     <circle cx="65" cy="20" r="10" fill="#8D6E63" />
     {/* Ears */}
     <path d="M 62 12 L 60 5 L 68 10 Z" fill="#6D4C41" />
     <path d="M 62 28 L 60 35 L 68 30 Z" fill="#6D4C41" />
     {/* Antlers */}
     <path d="M 68 16 L 76 10 M 72 13 L 76 14" stroke="#D7CCC8" strokeWidth="2" strokeLinecap="round" />
     <path d="M 68 24 L 76 30 M 72 27 L 76 26" stroke="#D7CCC8" strokeWidth="2" strokeLinecap="round" />
     {/* Nose */}
     <circle cx="73" cy="20" r="2" fill="#3E2723" />
  </svg>
);

const Rabbit: React.FC = () => (
  <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
    {/* Feet */}
    <ellipse cx="10" cy="12" rx="4" ry="6" fill="#e5e5e5" />
    <ellipse cx="10" cy="28" rx="4" ry="6" fill="#e5e5e5" />
    <ellipse cx="30" cy="12" rx="4" ry="6" fill="#e5e5e5" />
    <ellipse cx="30" cy="28" rx="4" ry="6" fill="#e5e5e5" />
    {/* Body */}
    <ellipse cx="20" cy="20" rx="15" ry="12" fill="#f5f5f5" />
    {/* Tail */}
    <circle cx="5" cy="20" r="4" fill="#fff" />
    {/* Head */}
    <circle cx="30" cy="20" r="8" fill="#f5f5f5" />
    {/* Ears */}
    <ellipse cx="32" cy="10" rx="2" ry="8" fill="#f5f5f5" stroke="#e5e5e5" transform="rotate(-20 32 10)" />
    <ellipse cx="32" cy="30" rx="2" ry="8" fill="#f5f5f5" stroke="#e5e5e5" transform="rotate(20 32 30)" />
    {/* Eyes */}
    <circle cx="34" cy="17" r="1" fill="black" />
    <circle cx="34" cy="23" r="1" fill="black" />
  </svg>
);

// Airplane separates Shadow from Body for 3D effect
const AirplaneBody: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Left Wing */}
    <path d="M 40 60 L 10 90 L 30 90 L 55 60 Z" fill="#cbd5e1" stroke="#94a3b8" />
    {/* Right Wing */}
    <path d="M 40 60 L 10 30 L 30 30 L 55 60 Z" fill="#cbd5e1" stroke="#94a3b8" />
    {/* Fuselage */}
    <path d="M 10 60 Q 10 50, 40 50 H 90 Q 115 60, 90 70 H 40 Q 10 70, 10 60" fill="#f1f5f9" stroke="#94a3b8" />
    {/* Cockpit */}
    <path d="M 75 52 L 85 55 L 85 65 L 75 68 Z" fill="#38bdf8" />
    {/* Propeller */}
    <rect x="110" y="20" width="4" height="80" fill="#475569" opacity="0.6" className="animate-spin origin-center" style={{transformOrigin: '112px 60px'}} />
    {/* Tail */}
    <path d="M 15 60 L 5 50 H 20 L 25 60 L 20 70 H 5 Z" fill="#ef4444" />
  </svg>
);

const AirplaneShadow: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
     <path d="M 40 60 L 10 90 L 30 90 L 55 60 Z" fill="black" />
     <path d="M 40 60 L 10 30 L 30 30 L 55 60 Z" fill="black" />
     <path d="M 10 60 Q 10 50, 40 50 H 90 Q 115 60, 90 70 H 40 Q 10 70, 10 60" fill="black" />
     <path d="M 15 60 L 5 50 H 20 L 25 60 L 20 70 H 5 Z" fill="black" />
  </svg>
);

const HelicopterBody: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Skids */}
    <rect x="20" y="30" width="40" height="4" rx="2" fill="#4b5563" />
    <rect x="20" y="66" width="40" height="4" rx="2" fill="#4b5563" />
    <path d="M 30 34 V 66 M 50 34 V 66" stroke="#4b5563" strokeWidth="3" />
    
    {/* Tail */}
    <rect x="5" y="45" width="40" height="10" fill="#eab308" />
    <circle cx="5" cy="50" r="8" fill="#eab308" />
    {/* Tail Rotor */}
    <rect x="0" y="35" width="2" height="30" fill="#94a3b8" className="animate-spin" style={{transformOrigin: '1px 50px', animationDuration: '0.1s'}} />
    
    {/* Body */}
    <ellipse cx="55" cy="50" rx="25" ry="20" fill="#eab308" stroke="#ca8a04" />
    {/* Cockpit */}
    <path d="M 60 35 Q 80 35, 80 50 Q 80 65, 60 65 Z" fill="#38bdf8" opacity="0.8" />
    
    {/* Main Rotor */}
    <g className="animate-spin" style={{transformOrigin: '55px 50px', animationDuration: '0.2s'}}>
        <rect x="5" y="48" width="100" height="4" fill="#1e293b" opacity="0.8" />
        <rect x="53" y="0" width="4" height="100" fill="#1e293b" opacity="0.8" />
        <circle cx="55" cy="50" r="4" fill="#cbd5e1" />
    </g>
  </svg>
);

const HelicopterShadow: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="30" width="40" height="4" rx="2" fill="black" />
    <rect x="20" y="66" width="40" height="4" rx="2" fill="black" />
    <rect x="5" y="45" width="40" height="10" fill="black" />
    <circle cx="5" cy="50" r="8" fill="black" />
    <ellipse cx="55" cy="50" rx="25" ry="20" fill="black" />
    <rect x="5" y="48" width="100" height="4" fill="black" opacity="0.3" />
    <rect x="53" y="0" width="4" height="100" fill="black" opacity="0.3" />
  </svg>
);

const renderObject = (type: ObjectType) => {
  switch (type) {
    case ObjectType.Car: return <Car />;
    case ObjectType.Motorcycle: return <Motorcycle />;
    case ObjectType.Boat: return <Boat />;
    case ObjectType.Deer: return <Deer />;
    case ObjectType.Rabbit: return <Rabbit />;
    default: return null;
  }
};

const objectSize = {
  [ObjectType.Car]: { width: 80, height: 40 },
  [ObjectType.Motorcycle]: { width: 60, height: 24 },
  [ObjectType.Boat]: { width: 100, height: 50 },
  [ObjectType.Airplane]: { width: 120, height: 120 },
  [ObjectType.Helicopter]: { width: 100, height: 100 },
  [ObjectType.Deer]: { width: 60, height: 30 },
  [ObjectType.Rabbit]: { width: 30, height: 30 },
};

// Determines stacking order based on object type and state
const getZIndex = (type: ObjectType, altitude: number = 0) => {
  switch (type) {
    case ObjectType.Boat: return 10;
    case ObjectType.Car: return 30;
    case ObjectType.Motorcycle: return 30;
    case ObjectType.Deer: return 30;
    case ObjectType.Rabbit: return 30;
    case ObjectType.Helicopter: return 50 + Math.round(altitude);
    case ObjectType.Airplane: return 50 + Math.round(altitude);
    default: return 20;
  }
};

const ObjectRenderer: React.FC<ObjectRendererProps> = ({ object, isPossessed, style, isHovered }) => {
  const size = objectSize[object.type];
  const altitude = object.altitude || 0;
  const zIndex = getZIndex(object.type, altitude);

  // Special render for aircraft with shadow separation
  if (object.type === ObjectType.Airplane || object.type === ObjectType.Helicopter) {
      const Body = object.type === ObjectType.Airplane ? AirplaneBody : HelicopterBody;
      const Shadow = object.type === ObjectType.Airplane ? AirplaneShadow : HelicopterShadow;

      return (
        <div
            className="absolute transition-transform duration-75 ease-linear"
            style={{
                left: `${object.position.x - size.width / 2}px`,
                top: `${object.position.y - size.height / 2}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                transform: `rotate(${object.rotation}deg)`,
                zIndex: zIndex, 
                ...style,
            }}
        >
            <div className="relative w-full h-full">
                 {/* Shadow */}
                 <div 
                    className="absolute inset-0 opacity-20" 
                    style={{ 
                        transform: `translate(-${altitude}px, ${altitude}px) scale(${1 - Math.min(0.5, altitude/200)})`
                    }}
                 >
                     <Shadow />
                 </div>
                 {/* Body */}
                 <div 
                    className="absolute inset-0 transition-transform duration-300"
                    style={{ transform: `scale(${1 + Math.min(0.5, altitude/100)})` }}
                 >
                    <Body />
                 </div>

                {isHovered && !isPossessed && (
                    <div className="absolute inset-[-10px] z-0 pointer-events-none">
                        <div className="w-full h-full rounded-full bg-yellow-400/50 filter blur-md animate-pulse border-2 border-yellow-200"></div>
                    </div>
                )}
            </div>
        </div>
      );
  }

  // Land/Sea Objects
  const isMoving = Math.abs(object.speed) > 0.5;
  let animationClass = '';
  
  if (isMoving) {
    if (object.type === ObjectType.Rabbit) animationClass = 'animate-bunny-hop';
    if (object.type === ObjectType.Deer) animationClass = 'animate-deer-prance';
  }

  return (
    <>
    <style>{`
        @keyframes bunnyHop {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.4); }
        }
        @keyframes deerPrance {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(3deg); }
            50% { transform: scale(1) rotate(0deg); }
            75% { transform: scale(1.1) rotate(-3deg); }
        }
        .animate-bunny-hop {
            animation: bunnyHop 0.3s infinite;
        }
        .animate-deer-prance {
            animation: deerPrance 0.5s infinite linear;
        }
    `}</style>
    <div
      className={`absolute transition-transform duration-75 ease-linear`}
      style={{
        left: `${object.position.x - size.width / 2}px`,
        top: `${object.position.y - size.height / 2}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `rotate(${object.rotation}deg)`,
        zIndex: zIndex,
        ...style,
      }}
    >
      <div className={`relative w-full h-full ${animationClass}`}>
        {renderObject(object.type)}
        {isHovered && !isPossessed && (
            <div className="absolute inset-[-10px] z-0 pointer-events-none">
                <div className="w-full h-full rounded-full bg-yellow-400/50 filter blur-md animate-pulse border-2 border-yellow-200"></div>
            </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ObjectRenderer;
