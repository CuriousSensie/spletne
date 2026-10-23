"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Domain-warped fbm in the brand palette; the pointer bends the field.
const FRAG = `
precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r.y;
  vec2 mm=m*vec2(r.x/r.y,1.);
  float d=length(uv-mm);
  vec2 q=vec2(fbm(uv*1.4+t*.05),fbm(uv*1.4-t*.04+3.1));
  vec2 w=uv+q*1.2+ (uv-mm)*.25*exp(-d*3.);
  float f=fbm(w*1.6+t*.03);
  vec3 navy=vec3(.027,.09,.165),plum=vec3(.39,.28,.35),sand=vec3(.85,.71,.64),ember=vec3(.94,.45,.28);
  vec3 c=mix(navy,plum,smoothstep(.3,.75,f));
  c=mix(c,sand,smoothstep(.62,.95,f)*.85);
  c+=ember*.35*exp(-d*4.)*smoothstep(.4,.9,f);
  c+= (h(gl_FragCoord.xy+t)-.5)*.035;
  gl_FragColor=vec4(c,1.);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error("createShader failed");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader compile error");
  return s;
}

export function ShaderField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return; // CSS gradient fallback stays visible.

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link error");
    } catch (err) {
      console.error("[ShaderField]", err);
      return;
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uM = gl.getUniformLocation(prog, "m");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
    };
    canvas.addEventListener("pointermove", onMove);

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const draw = (now: number): void => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="relative h-[30rem] w-full overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_30%,#63485a,#07172a_60%)]">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div className="pointer-events-none relative grid h-full place-items-center p-8 text-center text-[#f4f1e9]">
        <p className="max-w-[18ch] text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl">See your new website first</p>
      </div>
    </div>
  );
}
