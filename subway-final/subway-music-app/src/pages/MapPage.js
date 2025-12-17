import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import AudioContext from '../context/AudioContext';

// ===== CONSTANTS =====
const PATHS_DATA = [
  { 
    id: 'blue',
    color: '#D82233',
    label: '1',
    d: "M 157.98 0 l 76.04 76.31 c 1.49 1.5 2.33 3.53 2.33 5.64 v 458.27 c 0 4.26 1.69 8.35 4.71 11.36 l 60.68 60.68 h 12.7 l -65.03 -65.03 c -1.8 -1.8 -2.81 -4.24 -2.81 -6.79 v -35.78 c 0 -0.2 0.27 -0.26 0.36 -0.08 l 3.33 6.89 c 2.97 6.15 9.2 10.06 16.02 10.06 h 268.58 c 1.84 0 3.34 1.49 3.34 3.34 v 64.6 c 0 12.44 10.09 22.53 22.53 22.53 h 71.68 c 0 -10.88 -8.82 -19.7 -19.7 -19.7 h -51.81 c -1.44 0 -2.61 -1.17 -2.61 -2.61 v -66.52 c 0 -11.47 -9.3 -20.77 -20.77 -20.77 h -268.04 c -2.12 0 -3.84 -1.72 -3.84 -3.84 V 80.71 c 0 -8.31 -3.3 -16.28 -9.18 -22.16 L 198 0.07 l -40.01 -0.07 Z",
    stations: [
      { id: 'blue-st1', pathDistance: 200, trackId: 7 }, 
      { id: 'blue-st2', pathDistance: 500, trackId: 8 },
    ]
  },
  { 
    id: 'red',
    color: '#0062CF',
    label: 'A',
    d: "M 170.97 0 v 292.68 c 0 17.79 14.42 32.21 32.21 32.21 h 98.03 c 1.11 0 2.01 0.9 2.01 2.01 v 220.76 c 0 17.43 14.13 31.56 31.56 31.56 h 322.87 c 1.4 0 2.54 1.14 2.54 2.54 v 30.24 h 17.94 v -30.27 c 0 -12.37 -10.03 -22.41 -22.41 -22.41 h -319.68 c -2.77 0 -5.01 -2.24 -5.01 -5.01 v -229.22 c 0 -15.57 -12.62 -28.19 -28.19 -28.19 h -104.7 V 55.14 c 0 -1.83 1.48 -3.32 3.32 -3.32 h 507.34 c 6.03 0 11.8 -2.41 16.03 -6.7 L 769.35 0 h -12.53 l -40.62 40.62 c -1.18 1.18 -2.77 1.84 -4.43 1.84 H 201.03 c -2.98 0 -5.84 1.18 -7.95 3.29 l -4.05 4.05 c -0.13 0.13 -0.35 0.04 -0.35 -0.15 V 0 h -17.72 Z",
    stations: [
      { id: 'red-st1', pathDistance: 150, trackId: 4 },
      { id: 'red-st2', pathDistance: 350, trackId: 5 },
      { id: 'red-st3', pathDistance: 600, trackId: 6 },
    ]
  },
  { 
    id: 'green',
    color: '#009952',
    label: '4',
    d: "M 455.605 0 L 455.605 612.26", 
    stations: [
      { id: 'green-st1', pathDistance: 150, trackId: 1 },
      { id: 'green-st2', pathDistance: 300, trackId: 2 },
      { id: 'green-st3', pathDistance: 450, trackId: 3 },
    ]
  },
];

const SNAP_TOLERANCE = 40;
const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 650;

// ===== HELPER FUNCTIONS =====

// Initialize random circle positions (not on stations)
const getInitialCirclePositions = () => {
  const estimatedLengths = {
    'blue': 600,
    'red': 700,
    'green': 612
  };

  return PATHS_DATA.flatMap(path => {
    const pathLength = estimatedLengths[path.id] || 500;
    
    return [1, 2, 3].map((index) => {
      let randomDistance;
      let attempts = 0;
      
      // Find a random position not too close to any station
      do {
        randomDistance = 50 + Math.random() * (pathLength - 100);
        attempts++;
        
        const tooCloseToStation = path.stations.some(station => 
          Math.abs(randomDistance - station.pathDistance) < 50
        );
        
        if (!tooCloseToStation || attempts > 20) break;
        
      } while (attempts < 20);
      
      return {
        id: `${path.id}-circle-${index}`,
        pathId: path.id,
        distance: randomDistance,
        snappedStationId: null,
      };
    });
  });
};

// Find closest point on path to mouse position
function getPathPointFromMouse(pathEl, x, y) {
  const pathLength = pathEl.getTotalLength();
  const searchResolution = 200;
  let bestDistance = Infinity;
  let closestLength = 0;

  for (let i = 0; i < searchResolution; i++) {
    const length = (i / (searchResolution - 1)) * pathLength;
    const point = pathEl.getPointAtLength(length);
    const distanceSquared = (x - point.x) ** 2 + (y - point.y) ** 2;

    if (distanceSquared < bestDistance) {
      bestDistance = distanceSquared;
      closestLength = length;
    }
  }

  return closestLength;
}

// ===== MAIN COMPONENT =====
export default function MapPage() {
  // Context
  const { playTrack, pauseTrack, currentTrack, isPlaying } = useContext(AudioContext);
  
  // State
  const [circles, setCircles] = useState(getInitialCirclePositions());
  const [activeTrigger, setActiveTrigger] = useState(null); 
  const [tracks, setTracks] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCircleId, setDragCircleId] = useState(null);
  
  // Refs
  const svgRef = useRef(null);
  const pathRefs = useRef({});

  // ===== EFFECTS =====
  
  // Fetch tracks from JSON Server on mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tracks');
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    fetchTracks();
  }, []);

  // Handle mouse events during drag
  useEffect(() => {
    const onMouseMove = (e) => handleDrag(e);
    const onMouseUp = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragCircleId, circles, tracks]);

  // ===== EVENT HANDLERS =====
  
  const handleDragStart = (e, circleId) => {
    e.preventDefault();
    
    // Stop audio when starting to drag
    if (isPlaying) {
      pauseTrack();
      setActiveTrigger(null);
    }
    
    setIsDragging(true);
    setDragCircleId(circleId);
  };

  const handleDrag = (e) => {
    if (!isDragging || !dragCircleId || !svgRef.current) return;

    const draggedCircle = circles.find(c => c.id === dragCircleId);
    if (!draggedCircle) return;
    
    const pathEl = pathRefs.current[draggedCircle.pathId];
    if (!pathEl) return;
    
    // Convert mouse coordinates to SVG coordinates
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    const mouseY = e.clientY - svgRect.top;
    const svgX = (mouseX / svgRect.width) * VIEWBOX_WIDTH;
    const svgY = (mouseY / svgRect.height) * VIEWBOX_HEIGHT;

    // Find closest point on path
    const newDistance = getPathPointFromMouse(pathEl, svgX, svgY);

    // Check if near a station (snap to station if close)
    const pathData = PATHS_DATA.find(p => p.id === draggedCircle.pathId);
    let snappedStation = null;
    let finalDistance = newDistance;
    
    if (pathData) {
      for (const station of pathData.stations) {
        if (Math.abs(newDistance - station.pathDistance) <= SNAP_TOLERANCE) {
          finalDistance = station.pathDistance;
          snappedStation = station.id;
          break;
        }
      }
    }

    // Update circle position
    setCircles(prevCircles => prevCircles.map(c => 
      c.id === dragCircleId 
        ? { ...c, distance: finalDistance, snappedStationId: snappedStation } 
        : c
    ));
  };

  const handleDragEnd = () => {
    if (isDragging && dragCircleId) {
      const draggedCircle = circles.find(c => c.id === dragCircleId);
      
      // Play audio if snapped to a station
      if (draggedCircle?.snappedStationId) {
        const pathData = PATHS_DATA.find(p => p.id === draggedCircle.pathId);
        const station = pathData?.stations.find(s => s.id === draggedCircle.snappedStationId);
        
        if (station) {
          const trackToPlay = tracks.find(t => t.id === station.trackId);
          if (trackToPlay) {
            playTrack(trackToPlay);
            setActiveTrigger(station.id);
          }
        }
      }
    }
    
    setIsDragging(false);
    setDragCircleId(null);
  };

  // ===== UTILITY FUNCTIONS =====
  
  const getCirclePosition = (circle) => {
    const pathEl = pathRefs.current[circle.pathId];
    if (!pathEl) return { cx: 0, cy: 0 };
    
    const point = pathEl.getPointAtLength(circle.distance);
    return { cx: point.x, cy: point.y };
  };

  const getCurrentStationText = () => {
    if (!currentTrack) return 'Drag a circle to a station to play music';
    return `${currentTrack.stationName}. Sound play by ${currentTrack.instrument}`;
  };

  // ===== RENDER =====
  return (
    <div className="pt-32 px-[100px] pb-10 mx-auto md:pt-24 md:px-5">
      {/* Map Container */}
      <div 
        className="mt-14 bg-white p-8 rounded-3xl min-h-[650px] flex items-center justify-center relative overflow-hidden"
        ref={svgRef}
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23efefe8' stroke-width='1'%3E%3Cpath d='M100 0L0 0 0 100'/%3E%3C/g%3E%3C/svg%3E"),
            url(/bgmap.png)
          `,
          backgroundSize: '150px 150px, contain',
          backgroundPosition: '0 0, center',
          backgroundRepeat: 'repeat, no-repeat'
        }}
      >
        {/* SVG Map */}
        <svg 
          viewBox="0 0 800 650"
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subway Line Paths */}
          {PATHS_DATA.map(path => (
            <path
              key={path.id}
              ref={el => pathRefs.current[path.id] = el}
              d={path.d}
              stroke="black"
              strokeWidth={path.id === 'green' ? "19" : "20"} 
              fill="none"
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          ))}

          {/* Station Markers (white circles) */}
          {PATHS_DATA.flatMap(path => path.stations.map(station => {
            const pathEl = pathRefs.current[path.id];
            if (!pathEl || pathEl.getTotalLength() === 0) return null;

            const point = pathEl.getPointAtLength(station.pathDistance);
            
            return (
              <circle
                key={station.id}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#EFEFE7"
                stroke="black"
                strokeWidth="2"
              />
            );
          }))}

          {/* Draggable Circles */}
          {circles.map(circle => {
            const { cx, cy } = getCirclePosition(circle);
            const pathData = PATHS_DATA.find(p => p.id === circle.pathId);
            const isActive = circle.snappedStationId === activeTrigger;
            
            return (
              <g key={circle.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="14"
                  fill={pathData?.color || 'gray'}
                  strokeWidth={isActive ? "3" : "2"}
                  cursor="grab"
                  onMouseDown={(e) => handleDragStart(e, circle.id)}
                  style={{ 
                    cursor: isDragging && dragCircleId === circle.id ? 'grabbing' : 'grab'
                  }}
                />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="Helvetica, sans-serif"
                  pointerEvents="none"
                  style={{ userSelect: 'none' }}
                >
                  {pathData?.label || '?'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Station Info Text */}
      <div className="mt-4 text-l flex items-center gap-2 flex-wrap">
        <span className="font-normal">You are at </span>
        <span className="font-bold">{getCurrentStationText()}</span>
        <span className="font-normal">. Take </span>
        <span className="inline-flex gap-2">
          <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">1</span>
          <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">2</span>
          <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">3</span>
        </span>
        <span className="font-normal">to find out more!</span>
      </div>
    </div>
  );
}