
import React from 'react';
import { WORLD_SIZE, LAKE_CENTER, LAKE_RADIUS, ROADS } from '../types';
import type { WorldProp } from '../types';

const isBridge = (road: typeof ROADS[0]) => road.start.y === 3000 && road.end.y === 3000;

// Renders the Bridge structure on top of everything else (but below cars/planes)
// zIndex 20 ensures it covers Boats (zIndex 10) but is covered by Cars (zIndex 30)
export const WorldOverlays: React.FC = () => {
  // Find the bridge segment
  const bridge = ROADS.find(isBridge);
  
  if (!bridge) return null;

  return (
    <div className="absolute top-0 left-0 pointer-events-none" style={{ width: WORLD_SIZE, height: WORLD_SIZE, zIndex: 20 }}>
        <svg width={WORLD_SIZE} height={WORLD_SIZE}>
            <g>
                {/* Asphalt */}
                <line 
                    x1={bridge.start.x} y1={bridge.start.y} 
                    x2={bridge.end.x} y2={bridge.end.y} 
                    stroke="#334155" 
                    strokeWidth={bridge.width} 
                    strokeLinecap="round"
                />
                {/* Line Markings */}
                <line 
                    x1={bridge.start.x} y1={bridge.start.y} 
                    x2={bridge.end.x} y2={bridge.end.y} 
                    stroke="#fbbf24" 
                    strokeWidth="4" 
                    strokeDasharray="40 40"
                />
                {/* Bridge Rails */}
                <line x1={bridge.start.x} y1={bridge.start.y - bridge.width/2} x2={bridge.end.x} y2={bridge.end.y - bridge.width/2} stroke="#94a3b8" strokeWidth="8" />
                <line x1={bridge.start.x} y1={bridge.start.y + bridge.width/2} x2={bridge.end.x} y2={bridge.end.y + bridge.width/2} stroke="#94a3b8" strokeWidth="8" />
            </g>
        </svg>
    </div>
  );
};

interface GameWorldProps {
  worldProps: WorldProp[];
}

const GameWorld: React.FC<GameWorldProps> = ({ worldProps }) => {
  return (
    <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: WORLD_SIZE, height: WORLD_SIZE }}
    >
        {/* Base Ground - Grass Pattern */}
        <div className="absolute inset-0 bg-[#4ade80]" style={{
            backgroundImage: `radial-gradient(#22c55e 15%, transparent 16%), radial-gradient(#22c55e 15%, transparent 16%)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
            opacity: 0.8
        }} />

        {/* Lake */}
        <div 
            className="absolute bg-blue-500/80 rounded-full" 
            style={{
                left: LAKE_CENTER.x - LAKE_RADIUS, 
                top: LAKE_CENTER.y - LAKE_RADIUS, 
                width: LAKE_RADIUS * 2, 
                height: LAKE_RADIUS * 2,
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)',
                border: '20px solid rgba(186, 230, 253, 0.3)' // shoreline
            }} 
        />

        {/* Roads Layer 0 (Ground) */}
        <svg className="absolute inset-0 pointer-events-none opacity-90" width={WORLD_SIZE} height={WORLD_SIZE}>
            {ROADS.map((road, i) => {
                const bridge = isBridge(road);
                
                if (bridge) {
                    // For the bridge, only render a shadow on the water in this layer
                    return (
                         <line 
                            key={i} 
                            x1={road.start.x} y1={road.start.y + 20} 
                            x2={road.end.x} y2={road.end.y + 20} 
                            stroke="black" 
                            strokeWidth={road.width} 
                            strokeLinecap="round"
                            opacity={0.3}
                        />
                    );
                }

                return (
                    <g key={i}>
                        {/* Asphalt */}
                        <line 
                            x1={road.start.x} y1={road.start.y} 
                            x2={road.end.x} y2={road.end.y} 
                            stroke="#334155" 
                            strokeWidth={road.width} 
                            strokeLinecap="round"
                        />
                        {/* Line Markings */}
                        <line 
                            x1={road.start.x} y1={road.start.y} 
                            x2={road.end.x} y2={road.end.y} 
                            stroke="#fbbf24" 
                            strokeWidth="4" 
                            strokeDasharray="40 40"
                        />
                    </g>
                );
            })}
            
             {/* Runway specific graphic */}
            <g transform="rotate(45 600 600)">
                <rect x="200" y="540" width="800" height="120" fill="#1e293b" />
                <line x1="220" y1="600" x2="980" y2="600" stroke="white" strokeWidth="8" strokeDasharray="50 50" />
            </g>
        </svg>

        {/* Props Rendering */}
        {worldProps.map((prop) => (
            <div
                key={prop.id}
                className="absolute"
                style={{
                    left: prop.x,
                    top: prop.y,
                    transform: `scale(${prop.scale})`
                }}
            >
                {prop.type === 'tree' && (
                     <div className="relative drop-shadow-xl">
                        <div className="w-8 h-10 bg-amber-800 mx-auto rounded-sm" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-green-600 rounded-full opacity-90" />
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-green-500 rounded-full" />
                     </div>
                )}
                {prop.type === 'rock' && (
                    <div className="w-16 h-12 bg-stone-500 rounded-full drop-shadow-lg border-b-4 border-stone-700" />
                )}
            </div>
        ))}
    </div>
  );
};

export default GameWorld;
