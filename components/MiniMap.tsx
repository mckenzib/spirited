
import React from 'react';
import { ObjectType, PossessableObjectState, Vector2D, LAKE_CENTER, LAKE_RADIUS, ROADS, WORLD_SIZE } from '../types';

interface MiniMapProps {
  objects: PossessableObjectState[];
  playerPosition: Vector2D;
  possessedObjectId: string | null;
}

const MiniMap: React.FC<MiniMapProps> = ({ objects, playerPosition, possessedObjectId }) => {
  return (
    <div className="absolute top-4 right-4 w-32 h-32 md:w-48 md:h-48 bg-gray-900/80 border-2 border-white/20 rounded-full overflow-hidden shadow-2xl z-50 pointer-events-none backdrop-blur-sm">
       <svg viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`} className="w-full h-full opacity-90">
          {/* Background Terrain */}
          <rect width={WORLD_SIZE} height={WORLD_SIZE} fill="#064e3b" />

          {/* Lake */}
          <circle cx={LAKE_CENTER.x} cy={LAKE_CENTER.y} r={LAKE_RADIUS} fill="#3b82f6" opacity="0.6" />

          {/* Roads */}
          {ROADS.map((road, i) => (
             <line
               key={i}
               x1={road.start.x}
               y1={road.start.y}
               x2={road.end.x}
               y2={road.end.y}
               stroke="#94a3b8"
               strokeWidth={200} // Thick enough to see on minimap
               opacity="0.5"
               strokeLinecap="round"
             />
          ))}

          {/* Runway Strip */}
           <line x1="200" y1="600" x2="1000" y2="600" stroke="#1e293b" strokeWidth={250} transform="rotate(45 600 600)" opacity="0.5" />

          {/* Other Objects */}
          {objects.map(obj => {
             if (obj.id === possessedObjectId) return null; // Skip player (rendered separately)

             let color = "#d1d5db"; // default gray (Animals)
             if (obj.type === ObjectType.Car) color = "#ef4444"; // Red
             if (obj.type === ObjectType.Motorcycle) color = "#fca5a5"; // Light Red
             if (obj.type === ObjectType.Airplane || obj.type === ObjectType.Helicopter) color = "#facc15"; // Yellow
             if (obj.type === ObjectType.Boat) color = "#60a5fa"; // Blue

             return (
               <circle
                 key={obj.id}
                 cx={obj.position.x}
                 cy={obj.position.y}
                 r={120}
                 fill={color}
               />
             );
          })}

          {/* Player Marker */}
          <g transform={`translate(${playerPosition.x}, ${playerPosition.y})`}>
             <circle r={180} fill="#4ade80" fillOpacity="0.4" className="animate-ping" />
             <circle r={150} fill="#22c55e" stroke="white" strokeWidth={20} />
          </g>
       </svg>
       
       {/* Compass / Label */}
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/50">N</div>
    </div>
  );
};

export default MiniMap;
