import React, { useState } from 'react';
import './sidebar.css';

interface SidebarProps {
  selectedComponent: any;
  onRotate: (angle: number) => void;
  onDelete: () => void;
  onAdd: (type: string) => void;
}

const componentLibrary = {
  Walls: [{ type: 'Wall', img: '/assets/wall.png' }],
  Beds: [{ type: 'Bed', img: '/assets/bed.png' }],
  Desks: [{ type: 'Desk', img: '/assets/desk.png' }],
  Chairs: [{ type: 'Chair', img: '/assets/chair.png' }],
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedComponent,
  onRotate,
  onDelete,
  onAdd,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="sidebar">
      <h3>Component Details</h3>
      {selectedComponent ? (
        <div>
          <p><strong>Name:</strong> {selectedComponent.componentName}</p>
          <p><strong>X:</strong> {Math.round(selectedComponent.xCoord)}</p>
          <p><strong>Y:</strong> {Math.round(selectedComponent.yCoord)}</p>
          <p><strong>Rotation:</strong> {selectedComponent.rotationDeg}°</p>

          <button onClick={() => onRotate(15)}>⟳ Rotate +15°</button>
          <button onClick={() => onRotate(-15)}>⟲ Rotate -15°</button>
          <button onClick={onDelete} className="delete-button">🗑️ Delete</button>
        </div>
      ) : (
        <p>Select a component to see details.</p>
      )}

      <hr />
      <h4>Component Library</h4>
      <div className="component-library">
        {Object.entries(componentLibrary).map(([category, items]) => (
          <div key={category} className="library-category">
            <div
              className="category-title"
              onClick={() =>
                setExpandedCategory(prev => (prev === category ? null : category))
              }
            >
              ▶ {category}
            </div>
            {expandedCategory === category && (
              <div className="category-items">
                {items.map(item => (
                  <div
                    key={item.type}
                    className="library-item"
                    onClick={() => onAdd(item.type)}
                  >
                    <img src={item.img} alt={item.type} className="library-img" />
                    <div>{item.type}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
