import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import Draggable from "react-draggable";

function DrawingCanvas() {
  const canvasRef = useRef(null);
  let canvas;

  useEffect(() => {
    canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });
    canvas.freeDrawingBrush.width = 1; // Set brush width

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      className="border border-red-500"
      ref={canvasRef}
      width={800}
      height={800}
    />
  );
}

const FabricCanvas = () => {
  const containerSize = 800;
  const containerWidth = 80; // Change to your desired container width
  const containerHeight = 60; // Change to your desired container height
  const borderThreshold = 50; // Change the threshold distance from the container border
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseDown = (e) => {
    if (e.button === 2) { // Right mouse button
      e.preventDefault(); // Prevent the context menu from appearing
      setIsDragging(!isDragging);
      setDragStartX(e.clientX);
      setDragStartY(e.clientY);
      return;
    }

    if (
      e.clientX <= borderThreshold ||
      e.clientX >= containerWidth - borderThreshold ||
      e.clientY <= borderThreshold ||
      e.clientY >= containerHeight - borderThreshold
    ) {
      return; // Disable dragging when near container border
    }

    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    setOffsetX(offsetX + deltaX);
    setOffsetY(offsetY + deltaY);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: '100%', // Change to your desired width
        height: '100vh', // Change to your desired height
        border: '1px solid black',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s',
        }}
      >
        <DrawingCanvas />
      </div>
    </div>
  );
};
export default FabricCanvas;
