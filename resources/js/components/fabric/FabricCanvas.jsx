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
      width={400}
      height={400}
    />
  );
}

const FabricCanvas = () => {
  const containerSize = 3000;
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (e.button != 2) { // Right mouse button
      setIsDragging(false);
      return;
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

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: '800px', // Change to your desired width
        height: '600px', // Change to your desired height
        border: '1px solid black',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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
