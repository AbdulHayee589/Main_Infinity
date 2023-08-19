import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { HiMinus, HiPaintBrush, HiPlus } from "react-icons/hi2";
import clsx from "clsx";

const resizeImage = (image, width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  const resizedImage = new Image();
  resizedImage.src = canvas.toDataURL();
  return resizedImage;
};

const canvasWidth = 600;
const canvasHeight = 600;
const canvasBoundary = 0;
const maxScale = 3;
const minScale = 0.5;

const fabricCanvas = () => {
  const canvasRef = useRef(null);
  const imgInputRef = useRef(null);
  const selectedObjectRef = useRef(null);

  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [windowScale, setWindowScale] = useState(1);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });

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

  const handleZoom = (factor) => {
    const newScale = windowScale + factor;

    // Constrain scaling to avoid exceeding reasonable values
    if (newScale > maxScale) {
      setWindowScale(maxScale);
    } else if (newScale < minScale) {
      setWindowScale(minScale);
    } else {
      setWindowScale(newScale);
    }
  };

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

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
    document.querySelector("#dragContainer").style.cursor = isDragging
      ? "grab"
      : "default";
  }, [isDragging]);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      selection: true, 
  controlsAboveOverlay: true,
    });

    fabricCanvas.freeDrawingBrush.width = 1;
    setFabricCanvas(fabricCanvas);

    // fabricCanvas.on("object:moving", (e) => {
    //   const object = e.target;

    //   // Constrain movement within the fabricCanvas
    //   const canvasWidth = fabricCanvas.width;
    //   const canvasHeight = fabricCanvas.height;

    //   const maxX = canvasWidth - object.getScaledWidth();
    //   const maxY = canvasHeight - object.getScaledHeight();

    //   if (object.left < 0) {
    //     object.left = 0;
    //   } else if (object.left > maxX) {
    //     object.left = maxX;
    //   }

    //   if (object.top < 0) {
    //     object.top = 0;
    //   } else if (object.top > maxY) {
    //     object.top = maxY;
    //   }
    // });

    // fabricCanvas.on("object:selected", (e) => {
    //   e.target.set({
    //     lockMovementX: false,
    //     lockMovementY: false,
    //   });
    // });

    // fabricCanvas.on("selection:cleared", () => {
    //   fabricCanvas.getObjects().forEach((obj) => {
    //     obj.set({
    //       lockMovementX: false,
    //       lockMovementY: false,
    //     });
    //   });
    // });

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    // Calculate initial window position to center the fabricCanvas
    const centerX = (window.innerWidth - canvasBoundary) / 2;
    const centerY = (window.innerHeight - canvasBoundary) / 2;
    setWindowPosition({ x: centerX, y: centerY });

    // Calculate initial fabricCanvas position to center it inside the window
    const canvasX = (canvasBoundary - canvasWidth * windowScale) / 2;
    const canvasY = (canvasBoundary - canvasHeight * windowScale) / 2;
    setCanvasPosition({ x: canvasX, y: canvasY });
  }, []);

  return (
    <div className="relative">
      <div className="hover:cursor-default z-40 absolute top-0 left-0 right-0 px-6 py-4 border-b border-slate-200 bg-white">
        adsasdas
      </div>
      <div className="hover:cursor-default z-40 absolute flex justify-end items-center gap-4 bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-6 py-4">
        <button
          onClick={toggleDrawingMode}
          className={clsx(
            "text-3xl",
            isDrawingMode && "text-gold-main"
          )}
        >
          <HiPaintBrush />
        </button>

        <button onClick={() => handleZoom(-0.25)} className="text-3xl">
          <HiMinus />
        </button>
        <button onClick={() => handleZoom(0.25)} className="text-3xl">
          <HiPlus />
        </button>
        <input ref={imgInputRef} type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
   
    <div
      id="dragContainer"
      className="w-full h-screen overflow-hidden bg-slate-100"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        style={{
          position: "absolute",
          left: canvasPosition.x,
          top: canvasPosition.y,
          width: canvasWidth,
          height: canvasHeight,
          transform: `translate(${windowPosition.x}px, ${windowPosition.y}px) scale(${windowScale})`,
          transition: isDragging ? "none" : "transform 0.2s",
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
  );
};
export default fabricCanvas;
