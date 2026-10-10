import React, { useRef, useState, useEffect } from 'react';

interface VirtualJoystickProps {
  onMove: (vector: { x: number; y: number }) => void;
  maxRadius?: number; // default 48px
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onMove,
  maxRadius = 48
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [touchActive, setTouchActive] = useState(false);
  const touchOriginRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    touchOriginRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    setTouchActive(true);
    updateKnob(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchActive) return;
    const touch = e.touches[0];
    updateKnob(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setTouchActive(false);
    setKnobPos({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  };

  const updateKnob = (clientX: number, clientY: number) => {
    const dx = clientX - touchOriginRef.current.x;
    const dy = clientY - touchOriginRef.current.y;
    const dist = Math.hypot(dx, dy);

    let clampedX = dx;
    let clampedY = dy;

    if (dist > maxRadius) {
      clampedX = (dx / dist) * maxRadius;
      clampedY = (dy / dist) * maxRadius;
    }

    setKnobPos({ x: clampedX, y: clampedY });

    // Normalized vector: x between -1 and 1, y inverted so up is positive
    onMove({
      x: clampedX / maxRadius,
      y: -(clampedY / maxRadius)
    });
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-24 h-24 rounded-full border-[2.5px] border-[#111827] bg-white/70 backdrop-blur-sm shadow-[3px_3px_0px_#111827] flex items-center justify-center select-none touch-none"
    >
      {/* Outer crosshair guides */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-full h-[1px] bg-[#111827]" />
        <div className="absolute h-full w-[1px] bg-[#111827]" />
      </div>

      {/* Movable Thumb Knob */}
      <div
        className="w-11 h-11 rounded-full border-2 border-[#111827] bg-[#FF5722] text-white flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#111827] pointer-events-none transition-transform"
        style={{
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
        }}
      >
        <span>🕹️</span>
      </div>
    </div>
  );
};
