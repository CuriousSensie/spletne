"use client";

import { useEffect, useRef, type RefObject } from "react";
import { COMMON } from "./library";
import { hexToRgb, type Palette } from "./palettes";

interface ShaderCanvasProps {
  frag: string;
  palette: Palette;
  /** Time multiplier. */
  speed?: number;
  /** Render-resolution multiplier (backgrounds are soft, so <1 saves a lot of GPU). */
  scale?: number;
  className?: string;
  /** Seconds added to the start time, so several instances of one shader don't look identical. */
  timeOffset?: number;
  /**
   * Sample the shader in this element's coordinate space instead of the canvas's own,
   * so several canvases inside it draw one continuous field (and share pointer coords).
   */
  anchor?: RefObject<HTMLElement | null>;
  /** Drive time from the page clock, so separately mounted canvases stay in phase. */
  syncTime?: boolean;
  /**
   * When false the canvas keeps its last frame but stops rendering. Lets callers keep
   * canvases mounted and cross-fade them, instead of remounting (which flashes blank).
   */
  active?: boolean;
}

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error("createShader failed");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log ?? "shader compile error");
  }
  return s;
}

/**
 * Full-bleed WebGL2 background. Pauses offscreen and in hidden tabs, smooths the
 * pointer, records click ripples, and leaves the parent's CSS background as a
 * fallback if WebGL2 is unavailable or compilation fails.
 */
export function ShaderCanvas({ frag, palette, speed = 1, scale = 0.75, className = "", timeOffset = 0, anchor, syncTime = false, active = true }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteRef = useRef(palette);
  const speedRef = useRef(speed);
  const activeRef = useRef(active);
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    paletteRef.current = palette;
    speedRef.current = speed;
  }, [palette, speed]);

  useEffect(() => {
    activeRef.current = active;
    if (active) startRef.current?.();
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const gl = canvas?.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !host || !gl) return;

    let prog: WebGLProgram;
    try {
      const p = gl.createProgram();
      if (!p) throw new Error("createProgram failed");
      prog = p;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, `#version 300 es\nprecision highp float;\n${COMMON}\n${frag}`));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link error");
    } catch (err) {
      console.error("[ShaderCanvas] falling back to CSS background:", err);
      return;
    }

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      click: gl.getUniformLocation(prog, "u_click"),
      origin: gl.getUniformLocation(prog, "u_origin"),
      world: gl.getUniformLocation(prog, "u_world"),
      c: [0, 1, 2, 3].map((i) => gl.getUniformLocation(prog, `u_c${i}`)),
    };

    const mouse = { x: 0.62, y: 0.55, tx: 0.62, ty: 0.55 };
    const click = { x: 0.5, y: 0.5, t: -100 };
    let time = 7.3 + timeOffset; // start mid-flow so the first frame isn't the noise origin
    let last = performance.now();
    let raf = 0;
    let visible = true;

    const toLocal = (e: PointerEvent): [number, number] => {
      const r = (anchor?.current ?? canvas).getBoundingClientRect();
      return [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
    };
    const onMove = (e: PointerEvent): void => {
      const [x, y] = toLocal(e);
      if (x < -0.2 || x > 1.2 || y < -0.2 || y > 1.2) return;
      mouse.tx = x;
      mouse.ty = y;
    };
    const onDown = (e: PointerEvent): void => {
      [click.x, click.y] = toLocal(e);
      click.t = time;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onDown);

    /** Draw with current state (no time step). */
    const render = (): void => {
      gl.uniform2f(u.res, canvas.width, canvas.height);
      const a = anchor?.current;
      if (a) {
        const k = canvas.width / Math.max(1, canvas.clientWidth);
        const ar = a.getBoundingClientRect();
        const cr = canvas.getBoundingClientRect();
        gl.uniform2f(u.origin, (cr.left - ar.left) * k, (ar.bottom - cr.bottom) * k);
        gl.uniform2f(u.world, ar.width * k, ar.height * k);
      } else {
        gl.uniform2f(u.origin, 0, 0);
        gl.uniform2f(u.world, canvas.width, canvas.height);
      }
      gl.uniform1f(u.time, time);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform3f(u.click, click.x, click.y, click.t);
      paletteRef.current.forEach((hex, i) => gl.uniform3f(u.c[i], ...hexToRgb(hex)));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale;
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w; // resizing clears the drawing buffer…
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      render(); // …so redraw before the browser can paint a blank frame.
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const running = (): boolean => visible && !document.hidden && activeRef.current;

    const frame = (now: number): void => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (syncTime) time = 7.3 + timeOffset + (now / 1000) * speedRef.current;
      else time += dt * speedRef.current;
      const ease = 1 - Math.pow(0.001, dt); // frame-rate independent smoothing
      mouse.x += (mouse.tx - mouse.x) * ease;
      mouse.y += (mouse.ty - mouse.y) * ease;
      render();
      if (running()) raf = requestAnimationFrame(frame);
    };
    const start = (): void => {
      if (!raf && running()) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);

    const onLost = (e: Event): void => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
      visible = false;
      console.warn("[ShaderCanvas] WebGL context lost; showing CSS fallback.");
      canvas.style.opacity = "0";
    };
    canvas.addEventListener("webglcontextlost", onLost);
    startRef.current = start;
    // First frame synchronously, so the canvas never shows empty (even if mounted inactive).
    if (syncTime) time = 7.3 + timeOffset + (performance.now() / 1000) * speedRef.current;
    resize();
    render();
    start();

    return () => {
      startRef.current = null;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", start);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [frag, scale, timeOffset, anchor, syncTime]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 size-full ${className}`} />;
}
