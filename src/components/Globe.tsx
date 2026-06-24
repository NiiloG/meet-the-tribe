"use client";

import { useRef, useEffect, useCallback } from "react";

interface Dot {
  lat: number;
  lng: number;
  label: string;
}

const DOTS: Dot[] = [
  { lat: -2.5, lng: -76.5, label: "Amazonia" },
  { lat: -1.3, lng: 36.8, label: "Kenya" },
];

function toXY(lat: number, lng: number, rotX: number, rotY: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + rotY) * Math.PI) / 180;

  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);

  const cosRX = Math.cos((rotX * Math.PI) / 180);
  const sinRX = Math.sin((rotX * Math.PI) / 180);
  const y2 = y * cosRX - z * sinRX;
  const z2 = y * sinRX + z * cosRX;

  return { x, y: y2, z: z2 };
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotY = useRef(20);
  const rotX = useRef(-15);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const r = Math.min(W, H) * 0.4;

    ctx.clearRect(0, 0, W, H);

    // Sphere gradient background
    const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    grad.addColorStop(0, "#3d8a5e");
    grad.addColorStop(0.6, "#2f6b4a");
    grad.addColorStop(1, "#1a3d2b");
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Grid lines
    ctx.strokeStyle = "rgba(244,239,230,0.12)";
    ctx.lineWidth = 0.8;

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lng = -180; lng <= 180; lng += 4) {
        const p = toXY(lat, lng, rotX.current, rotY.current, r);
        if (p.z < 0) { first = true; continue; }
        const sx = cx + p.x;
        const sy = cy - p.y;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 4) {
        const p = toXY(lat, lng, rotX.current, rotY.current, r);
        if (p.z < 0) { first = true; continue; }
        const sx = cx + p.x;
        const sy = cy - p.y;
        if (first) { ctx.moveTo(sx, sy); first = false; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Destination dots
    DOTS.forEach((dot) => {
      const p = toXY(dot.lat, dot.lng, rotX.current, rotY.current, r);
      if (p.z < 0) return;
      const sx = cx + p.x;
      const sy = cy - p.y;

      // Pulse ring
      ctx.beginPath();
      ctx.arc(sx, sy, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(190,90,56,0.25)";
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#be5a38";
      ctx.fill();
      ctx.strokeStyle = "#f4efe6";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = "#f4efe6";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText(dot.label, sx + 9, sy - 5);
    });

    // Specular highlight
    const spec = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 0, cx - r * 0.2, cy - r * 0.2, r * 0.6);
    spec.addColorStop(0, "rgba(255,255,255,0.18)");
    spec.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = spec;
    ctx.fill();
  }, []);

  useEffect(() => {
    const loop = () => {
      if (!dragging.current) {
        rotY.current += 0.15;
      }
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotY.current += dx * 0.4;
    rotX.current = Math.max(-45, Math.min(45, rotX.current - dy * 0.4));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="globe-container flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        className="rounded-full shadow-2xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />
    </div>
  );
}
