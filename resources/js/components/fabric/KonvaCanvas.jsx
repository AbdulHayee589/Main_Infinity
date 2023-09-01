import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import { HiMinus, HiPlus } from "react-icons/hi2";
import KonvaShape from "./KonvaShape";
import { v4 as uuidv4 } from "uuid";
import KonvaImage from "./KonvaImage";

const canvasWidth = 600;
const canvasHeight = 600;
const maxScale = 2;
const minScale = 0.5;

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: uuidv4(),
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: uuidv4(),
  },
];

const KonvaCanvas = () => {
  const imgInputRef = useRef(null);
  const trRef = useRef(null);

  const [canvas, setCanvas] = useState({
    bgColor: "#fff",
    width: canvasWidth,
    height: canvasHeight,
    scale: 1,
  });

  const [images, setImages] = useState([]);
  const [shapes, setShapes] = useState(initialRectangles);
  const [texts, setTexts] = useState([]);

  const [selectedObject, setSelectedObject] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedObject(null);
    }
  };

  const handleZoom = (amount) => {
    const newScale = canvas.scale + amount;

    if (newScale < minScale || newScale > maxScale) return;

    setCanvas({
      ...canvas,
      scale: newScale,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new window.Image();
        image.src = e.target.result;

        image.onload = () => {
          setImages([
            ...images,
            {
              id: uuidv4(),
              src: image,
              width: image.width,
              height: image.height,
            },
          ]);
        };
      };

      reader.readAsDataURL(file);
      imgInputRef.current.value = "";
    }
  };

  useEffect(() => {
    console.log(canvas);
  }, [canvas]);

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
                setCanvas({ ...canvas, bgColor: "#232323" });
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
            <span>{canvas.scale.toFixed(2)}%</span>
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
              transform: `scale(${canvas.scale})`,
              transformOrigin: "center",
            }}
          >
            <Stage
              width={canvas.width}
              height={canvas.height}
              style={{
                backgroundColor: canvas.bgColor,
                border: "4px dashed #000",
              }}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
            >
              <Layer>
                {shapes.map((shape) => (
                  <KonvaShape
                    key={shape.id}
                    shapeProps={shape}
                    isSelected={shape.id === selectedObject}
                    onSelect={() => {
                      setSelectedObject(shape.id);
                    }}
                    onChange={(newAttrs) => {
                      console.log(newAttrs);
                      const shapesCopy = shapes;
                      const objIndex = shapes.findIndex(
                        (o) => o.id === shape.id
                      );
                      shapesCopy[objIndex] = newAttrs;
                      setShapes(shapesCopy);
                    }}
                  />
                ))}

                {images.map((img) => (
                  <KonvaImage
                    key={img.id}
                    shapeProps={img}
                    isSelected={img.id === selectedObject}
                    onSelect={() => {
                      setSelectedObject(img.id);
                    }}
                    onChange={(newAttrs) => {
                      console.log(newAttrs);
                      const imagesCopy = images;
                      const objIndex = images.findIndex(
                        (o) => o.id === img.id
                      );
                      imagesCopy[objIndex] = newAttrs;
                      setImages(imagesCopy);
                    }}
                  />
                ))}
              </Layer>
            </Stage>
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
export default KonvaCanvas;
