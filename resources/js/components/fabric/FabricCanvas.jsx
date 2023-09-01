import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import clsx from "clsx";
import { HiMinus, HiPaintBrush, HiPlus } from "react-icons/hi2";

const canvasWidth = 600;
const canvasHeight = 600;
const canvasBoundary = 0;
const maxScale = 2;
const minScale = 0.5;

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const imgInputRef = useRef(null);
  const selectedObjectRef = useRef(null);

  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [windowScale, setWindowScale] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    if (event.button === 2) {
      setDragStartPosition({ x: event.clientX, y: event.clientY });
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "grab";
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - dragStartPosition.x;
      const deltaY = event.clientY - dragStartPosition.y;

      const newWindowX = windowPosition.x + deltaX;
      const newWindowY = windowPosition.y + deltaY;

      // Constrain movement within the fabricCanvas boundary
      const maxX = window.innerWidth - canvasBoundary;
      const maxY = window.innerHeight - canvasBoundary;

      const constrainedX = Math.max(
        -canvasBoundary,
        Math.min(maxX, newWindowX)
      );
      const constrainedY = Math.max(
        -canvasBoundary,
        Math.min(maxY, newWindowY)
      );

      setWindowPosition({ x: constrainedX, y: constrainedY });
      setDragStartPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const toggleDrawingMode = () => setIsDrawingMode(!isDrawingMode);

  const handleZoom = (factor) => {
    const newScale = windowScale + factor;

    if (newScale > maxScale) {
      setWindowScale(maxScale);
    } else if (newScale < minScale) {
      setWindowScale(minScale);
    } else {
      setWindowScale(newScale);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.classList.add("z-40");

        img.onload = () => {
          const scaleX = 300 / img.width;
          const scaleY = 300 / img.height;
          const scale = Math.min(scaleX, scaleY);

          const fabricImage = new fabric.Image(img, {
            scaleX: scale,
            scaleY: scale,
            left: 100,
            top: 100,
          });

          // Add the image to the fabricCanvas
          fabricCanvas.add(fabricImage);
        };
      };

      reader.readAsDataURL(file);
      imgInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = isDrawingMode;
      fabricCanvas.selection = isDrawingMode ? false : true;
    }
  }, [fabricCanvas, isDrawingMode]);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      selection: true,
      controlsAboveOverlay: true,
      backgroundColor: "#fff",
    });

    fabricCanvas.freeDrawingBrush.width = 1;
    setFabricCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  return (
    <div
      className="w-full h-full grid grid-cols-5"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative col-span-4 bg-slate-100">
        <div className="min-w-full min-h-screen grid items-center justify-center overflow-auto">
          <div className="absolute flex gap-4 bottom-6 right-4 z-20 bg-white shadow-xl p-2">
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => {
                fabricCanvas.setBackgroundColor("#232323");
              }}
            >
              asda
            </button>
            <button
              onClick={() => handleZoom(-0.25)}
              className="text-2xl"
            >
              <HiMinus />
            </button>
            <span>{windowScale}%</span>
            <button
              onClick={() => handleZoom(0.25)}
              className="text-2xl"
            >
              <HiPlus />
            </button>
          </div>

          <div
            className="transition-all"
            style={{
              transform: `scale(${windowScale})`,
              transformOrigin: "center",
            }}
          >
            <canvas
              className="border-dashed border-4 border-black"
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
            />
          </div>
        </div>
      </div>
      <div
        id="sidebar"
        className="h-screen col-span-1 border-4 border-red-500"
      >
        asdada
      </div>
    </div>
  );
};
export default FabricCanvas;
