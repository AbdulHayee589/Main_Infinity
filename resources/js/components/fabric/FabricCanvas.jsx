import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { draw } from "./drawing";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ offsetX, offsetY }) => {
    draw(canvasRef.current, offsetX, offsetY);
    setIsDrawing(true);
  };

  const continueDrawing = ({ offsetX, offsetY }) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'path') {
      activeObject.path.push(['L', offsetX, offsetY]);
      canvas.renderAll();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={continueDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      width={600}
      height={600}
    />
  );
};
export default FabricCanvas;
