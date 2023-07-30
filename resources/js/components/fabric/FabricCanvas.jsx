import { useEffect } from "react";
import { fabric } from "fabric";

const FabricCanvas = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas("fabric-canvas");
    // Configure the canvas and add objects, event listeners, etc.
  }, []);

  return (
    <div className="">
      canvas
      <canvas className="" id="fabric-canvas" />
    </div>
  );
};
export default FabricCanvas;
