import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import type { PlacedComponent } from '../types/PlacedComponent';
import './FloorPlan.css';

const GRID_SIZE = 20;

const FloorPlan: React.FC = () => {
  const [components, setComponents] = useState<PlacedComponent[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const panStart = useRef({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/placed-components/floorplan/1');
        setComponents(res.data as PlacedComponent[]);
      } catch (err) {
        console.error('Error fetching components:', err);
      }
    };

    fetchComponents();
  }, []);

  useEffect(() => {
    const handleDelete = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedId !== null) {
        setComponents(prev => prev.filter(c => c.id !== selectedId));
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [selectedId]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setIsPanning(true);
      panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      });
    } else if (draggingId !== null) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      const canvasX = (e.clientX - containerRect.left - offset.x) / zoom;
      const canvasY = (e.clientY - containerRect.top - offset.y) / zoom;

      const snappedX = Math.round(canvasX / GRID_SIZE) * GRID_SIZE;
      const snappedY = Math.round(canvasY / GRID_SIZE) * GRID_SIZE;

      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === draggingId
            ? { ...comp, xCoord: snappedX, yCoord: snappedY }
            : comp
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setIsPanning(false);
  };

  const rotateComponent = (angle: number) => {
    if (selectedId === null) return;
    setComponents(prev => prev.map(comp =>
      comp.id === selectedId ? { ...comp, rotationDeg: comp.rotationDeg + angle } : comp
    ));
  };

  const addComponent = (type: string) => {
    const newComp: PlacedComponent = {
      id: Date.now(),
      xCoord: 100,
      yCoord: 100,
      rotationDeg: 0,
      floorPlanId: 1,
      componentTypeId: 0,
      componentName: type,
      createdBy: 1
    };
    setComponents(prev => [...prev, newComp]);
    setSelectedId(newComp.id);
  };

  const selectedComponent = components.find(c => c.id === selectedId);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        selectedComponent={selectedComponent}
        onRotate={rotateComponent}
        onAdd={addComponent}
        onDelete={() => {
          if (selectedId !== null) {
            setComponents(prev => prev.filter(comp => comp.id !== selectedId));
            setSelectedId(null);
          }
        }}
      />

      <div
        ref={containerRef}
        className={`floor-plan-container ${showGrid ? 'grid-visible' : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <button className="toggle-grid-button" onClick={() => setShowGrid(prev => !prev)}>
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>

        <div
          className="floor-plan"
          style={{
            transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
            transformOrigin: 'top left',
          }}
        >
          {components.map((comp) => (
            <div
              key={comp.id}
              className="component-box"
              onMouseDown={(e) => {
                e.stopPropagation();
                setSelectedId(comp.id);
                setDraggingId(comp.id);
              }}
              style={{
                left: `${comp.xCoord}px`,
                top: `${comp.yCoord}px`,
                transform: `rotate(${comp.rotationDeg}deg)`,
                border: comp.id === selectedId ? '2px solid blue' : '1px solid white',
                padding: '10px',
                background: 'white',
                position: 'absolute',
                cursor: 'grab'
              }}
            >
              {comp.componentName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
