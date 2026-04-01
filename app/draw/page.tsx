"use client";

import { useRef, useState, useEffect } from "react";

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#E8DCC4");
  const [brushSize, setBrushSize] = useState(3);
  const [savedImages, setSavedImages] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const savePNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");

    // Download it
    const link = document.createElement("a");
    link.download = `drawing-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    setSavedImages((prev) => [...prev, dataUrl]);
  };

  const colors = ["#E8DCC4", "#ffffff", "#C49A6C", "#D4A853", "#FF6B6B", "#4ECDC4", "#45B7D1"];

  return (
    <div style={{ background: "black", minHeight: "100vh", padding: "80px 20px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ color: "#E8DCC4", fontSize: "1.2rem", marginBottom: 16 }}>
          Draw Tool
        </h1>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          {/* Colors */}
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: c,
                border: color === c ? "2px solid #E8DCC4" : "2px solid #333",
                cursor: "pointer",
                outline: color === c ? "2px solid #E8DCC4" : "none",
                outlineOffset: 2,
              }}
            />
          ))}

          {/* Eraser */}
          <button
            onClick={() => setColor("rgba(0,0,0,1)")}
            style={{
              padding: "4px 12px",
              background: color === "rgba(0,0,0,1)" ? "#333" : "#111",
              color: "#E8DCC4",
              border: "1px solid #444",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Eraser
          </button>

          {/* Brush size */}
          <label style={{ color: "#c4b89a", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}>
            Size:
            <input
              type="range"
              min={1}
              max={20}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: 80 }}
            />
            {brushSize}px
          </label>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              onClick={clearCanvas}
              style={{
                padding: "6px 16px",
                background: "#222",
                color: "#E8DCC4",
                border: "1px solid #444",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Clear
            </button>
            <button
              onClick={savePNG}
              style={{
                padding: "6px 16px",
                background: "#D4A853",
                color: "black",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              Save PNG
            </button>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          style={{
            width: "100%",
            height: 500,
            background: "transparent",
            border: "1px solid #333",
            borderRadius: 4,
            cursor: "crosshair",
            touchAction: "none",
          }}
        />

        <p style={{ color: "#666", fontSize: "0.75rem", marginTop: 8 }}>
          Transparent background — your drawing saves as a PNG with transparency.
          Drop the saved file into <code style={{ color: "#c4b89a" }}>public/about/</code> and let me know.
        </p>
      </div>
    </div>
  );
}
