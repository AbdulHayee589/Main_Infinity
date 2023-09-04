import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";
import {
  addNewCircle,
  addNewImage,
  addNewLine,
  addNewRect,
} from "./elements/elements";
import { BiRectangle, BiCircle } from "react-icons/bi";
import KonvaObjectsMap from "./KonvaObjectsMap";
import { FaFileExport } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";

const canvasWidth = 600;
const canvasHeight = 600;
const maxScale = 2;
const minScale = 0.5;

const KonvaCanvas = () => {
  const imgInputRef = useRef(null);
  const stageRef = useRef(null);

  const [canvas, setCanvas] = useState({
    bgColor: "#fff",
    width: canvasWidth,
    height: canvasHeight,
    scale: 1,
  });

  const [konvaObjects, setKonvaObjects] = useState([]);
  const [selectedKonvaObject, setSelectedKonvaObject] = useState(null);

  const handleExport = () => {
    setSelectedKonvaObject(null);

    setTimeout(() => {
      const uri = stageRef.current.toDataURL();
      console.log(uri);

      var link = document.createElement("a");
      link.download = "konva-canvas.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1);
  };

  const handleDeleteSelectedObject = () => {
    setKonvaObjects(
      konvaObjects.filter((o) => o.id != selectedKonvaObject)
    );
    setSelectedKonvaObject(null);
  };

  const handleKonvaObjectChange = (obj, newAttrs) => {
    console.log(newAttrs);
    const objsCopy = konvaObjects;
    const objIndex = konvaObjects.findIndex((o) => o.id === obj.id);
    objsCopy[objIndex] = newAttrs;
    setKonvaObjects(objsCopy);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedKonvaObject(null);
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

  const handleAddNewRect = () => {
    const rect = addNewRect();
    setKonvaObjects([...konvaObjects, rect]);
  };
  const handleAddNewCircle = () => {
    const circle = addNewCircle();
    setKonvaObjects([...konvaObjects, circle]);
  };
  const handleAddNewLine = () => {
    const line = addNewLine();
    setKonvaObjects([...konvaObjects, line]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new window.Image();
        image.src = e.target.result;

        image.onload = () => {
          const img = addNewImage(image);
          setKonvaObjects([...konvaObjects, img]);
        };
      };

      reader.readAsDataURL(file);
      imgInputRef.current.value = "";
    }
  };

  useEffect(() => {
    console.log(canvas);
  }, [canvas]);

  useEffect(() => {
    console.log(konvaObjects);
  }, [konvaObjects]);

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
              onClick={handleDeleteSelectedObject}
              disabled={!!!selectedKonvaObject}
            >
              <HiTrash />
            </button>
            <button onClick={handleExport}>
              <FaFileExport />
            </button>
            <button onClick={handleAddNewRect}>
              <BiRectangle />
            </button>

            <button onClick={handleAddNewCircle}>
              <BiCircle />
            </button>
            <button onClick={handleAddNewLine}>
              <AiOutlineEnter />
            </button>

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
              ref={stageRef}
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
                <KonvaObjectsMap
                  konvaObjects={konvaObjects}
                  selectedKonvaObject={selectedKonvaObject}
                  setSelectedKonvaObject={
                    setSelectedKonvaObject
                  }
                  handleKonvaObjectChange={
                    handleKonvaObjectChange
                  }
                />
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
