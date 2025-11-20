
import React from 'react';
import { ObjectType } from '../types';

interface ControlPanelProps {
  possessedObjectType: ObjectType | null;
  onControlChange: (control: string, state: boolean) => void;
  onRelease: () => void;
}

const ControlButton: React.FC<{
  onMouseDown: () => void;
  onMouseUp: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}> = ({ children, className, ariaLabel, ...props }) => (
  <button
    {...props}
    aria-label={ariaLabel}
    className={`select-none w-16 h-16 md:w-20 md:h-20 bg-gray-800/80 text-white rounded-full flex items-center justify-center text-3xl active:bg-cyan-500 backdrop-blur-sm transition-colors pointer-events-auto touch-manipulation ${className}`}
  >
    {children}
  </button>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ possessedObjectType, onControlChange, onRelease }) => {
  // Define labels for all types, including a default for Spirit
  const defaultLabels = { forward: 'Up', backward: 'Down', left: 'Left', right: 'Right' };

  const controlLabels: Record<string, typeof defaultLabels> = {
    [ObjectType.Car]: { forward: 'Gas', backward: 'Brake', left: 'Left', right: 'Right' },
    [ObjectType.Motorcycle]: { forward: 'Gas', backward: 'Brake', left: 'Left', right: 'Right' },
    [ObjectType.Boat]: { forward: 'Throttle', backward: 'Reverse', left: 'Port', right: 'Starboard' },
    [ObjectType.Airplane]: { forward: 'Thrust', backward: 'Brake', left: 'Bank Left', right: 'Bank Right' },
    [ObjectType.Helicopter]: { forward: 'Cyclic', backward: 'Back', left: 'L', right: 'R' },
    [ObjectType.Deer]: { forward: 'Run', backward: 'Stop', left: 'Left', right: 'Right' },
    [ObjectType.Rabbit]: { forward: 'Hop', backward: 'Stop', left: 'Left', right: 'Right' },
  };

  const labels = possessedObjectType ? controlLabels[possessedObjectType] : defaultLabels;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 flex justify-between items-end z-50 pointer-events-none pb-8 safe-area-bottom">
      {/* Left/Right Controls */}
      <div className="flex gap-4">
        <ControlButton
          onMouseDown={() => onControlChange('left', true)}
          onMouseUp={() => onControlChange('left', false)}
          onTouchStart={() => onControlChange('left', true)}
          onTouchEnd={() => onControlChange('left', false)}
          ariaLabel={labels.left}
        >
          &larr;
        </ControlButton>
        <ControlButton
          onMouseDown={() => onControlChange('right', true)}
          onMouseUp={() => onControlChange('right', false)}
          onTouchStart={() => onControlChange('right', true)}
          onTouchEnd={() => onControlChange('right', false)}
          ariaLabel={labels.right}
        >
          &rarr;
        </ControlButton>
      </div>

      {/* Release Button - Only show when possessing something */}
      {possessedObjectType && (
        <button 
          onClick={onRelease}
          className="pointer-events-auto px-6 py-3 bg-red-600/80 text-white rounded-lg backdrop-blur-sm hover:bg-red-500 transition-colors font-bold mb-2"
        >
          Release
        </button>
      )}

      {/* Forward/Backward Controls */}
      <div className="flex gap-4">
        { possessedObjectType !== ObjectType.Airplane &&
          <ControlButton
            onMouseDown={() => onControlChange('backward', true)}
            onMouseUp={() => onControlChange('backward', false)}
            onTouchStart={() => onControlChange('backward', true)}
            onTouchEnd={() => onControlChange('backward', false)}
            ariaLabel={labels.backward}
          >
            &darr;
          </ControlButton>
        }
        { possessedObjectType === ObjectType.Airplane &&
          <ControlButton
            onMouseDown={() => onControlChange('backward', true)}
            onMouseUp={() => onControlChange('backward', false)}
            onTouchStart={() => onControlChange('backward', true)}
            onTouchEnd={() => onControlChange('backward', false)}
            ariaLabel={labels.backward}
          >
            <span className="text-sm font-bold">BRAKE</span>
          </ControlButton>
        }
        <ControlButton
          onMouseDown={() => onControlChange('forward', true)}
          onMouseUp={() => onControlChange('forward', false)}
          onTouchStart={() => onControlChange('forward', true)}
          onTouchEnd={() => onControlChange('forward', false)}
          ariaLabel={labels.forward}
        >
          {possessedObjectType === ObjectType.Airplane ? <span className="text-sm font-bold">THRUST</span> : <>&uarr;</>}
        </ControlButton>
      </div>
    </div>
  );
};

export default ControlPanel;
