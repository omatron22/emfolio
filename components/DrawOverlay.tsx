"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type Tool = "freehand" | "line" | "fill";

export default function DrawOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#E8DCC4");
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<Tool>("freehand");
  const [history, setHistory] = useState<ImageData[]>([]);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const [previewSnapshot, setPreviewSnapshot] = useState<ImageData | null>(null);
  const [mirror, setMirror] = useState(true);
  const lastMirrorPos = useRef<{ x: number; y: number } | null>(null);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-30), data]);
  }, []);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const last = newHistory.pop()!;
      ctx.putImageData(last, 0, 0);
      return newHistory;
    });
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
    if (ctx && imageData) {
      ctx.putImageData(imageData, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isActive, resize]);

  // Keyboard shortcut: Ctrl+Z for undo
  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isActive, undo]);

  const floodFill = useCallback((startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    // Parse fill color
    const tmp = document.createElement("canvas").getContext("2d")!;
    tmp.fillStyle = fillColor;
    tmp.fillRect(0, 0, 1, 1);
    const fc = tmp.getImageData(0, 0, 1, 1).data;

    const sx = Math.round(startX);
    const sy = Math.round(startY);
    const idx = (sy * w + sx) * 4;
    const targetR = data[idx];
    const targetG = data[idx + 1];
    const targetB = data[idx + 2];
    const targetA = data[idx + 3];

    // Don't fill if clicking on same color
    if (targetR === fc[0] && targetG === fc[1] && targetB === fc[2] && targetA === fc[3]) return;

    const tolerance = 30;
    const match = (i: number) =>
      Math.abs(data[i] - targetR) <= tolerance &&
      Math.abs(data[i + 1] - targetG) <= tolerance &&
      Math.abs(data[i + 2] - targetB) <= tolerance &&
      Math.abs(data[i + 3] - targetA) <= tolerance;

    const stack = [sx, sy];
    const visited = new Uint8Array(w * h);

    while (stack.length > 0) {
      const y = stack.pop()!;
      const x = stack.pop()!;
      const pos = y * w + x;
      if (x < 0 || x >= w || y < 0 || y >= h || visited[pos]) continue;
      const i = pos * 4;
      if (!match(i)) continue;
      visited[pos] = 1;
      data[i] = fc[0];
      data[i + 1] = fc[1];
      data[i + 2] = fc[2];
      data[i + 3] = fc[3];
      stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
    }

    ctx.putImageData(imageData, 0, 0);
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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    saveToHistory();
    const { x, y } = getPos(e);

    if (tool === "fill") {
      floodFill(x, y, color);
      if (mirror) {
        floodFill(canvas.width - x, y, color);
      }
      return;
    }

    setIsDrawing(true);

    if (tool === "line") {
      setLineStart({ x, y });
      setPreviewSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
      if (mirror) {
        lastMirrorPos.current = { x: canvas.width - x, y };
      }
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const { x, y } = getPos(e);

    if (tool === "line" && lineStart && previewSnapshot) {
      ctx.putImageData(previewSnapshot, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lineStart.x, lineStart.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      if (mirror) {
        const cw = canvas.width;
        ctx.beginPath();
        ctx.moveTo(cw - lineStart.x, lineStart.y);
        ctx.lineTo(cw - x, y);
        ctx.stroke();
      }
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
      if (mirror && lastMirrorPos.current) {
        const mx = canvas.width - x;
        ctx.beginPath();
        ctx.moveTo(lastMirrorPos.current.x, lastMirrorPos.current.y);
        ctx.lineTo(mx, y);
        ctx.stroke();
        lastMirrorPos.current = { x: mx, y };
        // Restart the main path so it continues from the right position
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const stopDraw = () => {
    setIsDrawing(false);
    setLineStart(null);
    setPreviewSnapshot(null);
    lastMirrorPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    saveToHistory();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const savePNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `about-drawing-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const colors = ["#E8DCC4", "#ffffff", "#D4A853", "#C49A6C", "#FF6B6B", "#4ECDC4"];

  const toolBtn = (label: string, value: Tool) => ({
    padding: "4px 10px",
    background: tool === value ? "#D4A853" : "#333",
    color: tool === value ? "black" : "#E8DCC4",
    border: "none",
    borderRadius: 4,
    cursor: "pointer" as const,
    fontSize: "0.75rem",
    fontWeight: tool === value ? "bold" as const : "normal" as const,
  });

  return (
    <>
      <button
        onClick={() => setIsActive(!isActive)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: isActive ? "#D4A853" : "#222",
          color: isActive ? "black" : "#E8DCC4",
          border: "2px solid #D4A853",
          cursor: "pointer",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title={isActive ? "Exit draw mode" : "Enter draw mode"}
      >
        {isActive ? "✕" : "✎"}
      </button>

      {isActive && (
        <>
          <div
            style={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: "rgba(0,0,0,0.9)",
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #333",
            }}
          >
            {/* Tools */}
            <button onClick={() => setTool("freehand")} style={toolBtn("Draw", "freehand")}>
              Draw
            </button>
            <button onClick={() => setTool("line")} style={toolBtn("Line", "line")}>
              Line
            </button>
            <button onClick={() => setTool("fill")} style={toolBtn("Fill", "fill")}>
              Fill
            </button>

            <button
              onClick={() => setMirror(!mirror)}
              style={{
                padding: "4px 10px",
                background: mirror ? "#D4A853" : "#333",
                color: mirror ? "black" : "#E8DCC4",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: mirror ? "bold" : "normal",
              }}
              title="Mirror drawing horizontally"
            >
              Mirror
            </button>

            <div style={{ width: 1, height: 20, background: "#444", margin: "0 4px" }} />

            {/* Colors */}
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: c,
                  border: color === c ? "2px solid #fff" : "2px solid #555",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            ))}

            <div style={{ width: 1, height: 20, background: "#444", margin: "0 4px" }} />

            <input
              type="range"
              min={1}
              max={12}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: 60 }}
            />

            <div style={{ width: 1, height: 20, background: "#444", margin: "0 4px" }} />

            <button
              onClick={undo}
              style={{
                padding: "4px 10px",
                background: "#333",
                color: "#E8DCC4",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.75rem",
              }}
              title="Undo (Ctrl+Z)"
            >
              Undo
            </button>
            <button
              onClick={clearCanvas}
              style={{
                padding: "4px 10px",
                background: "#333",
                color: "#E8DCC4",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.75rem",
              }}
            >
              Clear
            </button>
            <button
              onClick={savePNG}
              style={{
                padding: "4px 10px",
                background: "#D4A853",
                color: "black",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          </div>

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
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 9998,
              cursor: "crosshair",
              touchAction: "none",
            }}
          />
        </>
      )}
    </>
  );
}
