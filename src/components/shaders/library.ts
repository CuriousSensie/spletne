/**
 * Fragment shader bodies (GLSL ES 3.00). Each is appended to COMMON, which
 * provides uniforms, noise helpers, palette sampling, pointer and click ripple.
 */

export const COMMON = /* glsl */ `
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;   // 0..1, smoothed
uniform vec3 u_click;   // xy 0..1, z = time of click
uniform vec3 u_c0, u_c1, u_c2, u_c3;
uniform vec2 u_origin;  // this canvas's offset inside a shared "world" (px); 0 when not anchored
uniform vec2 u_world;   // size of that world (px); equals u_res when not anchored
out vec4 o;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
const mat2 ROT = mat2(0.8, 0.6, -0.6, 0.8);
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p = ROT * p * 2.02; a *= 0.5; } return v; }

vec3 pal(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c = mix(u_c0, u_c1, smoothstep(0.0, 0.4, t));
  c = mix(c, u_c2, smoothstep(0.35, 0.75, t));
  return mix(c, u_c3, smoothstep(0.75, 1.0, t));
}
vec2 aspectUv(vec2 p01) { return (p01 - 0.5) * vec2(u_world.x / u_world.y, 1.0); }
vec2 fragUv() { return (gl_FragCoord.xy + u_origin - 0.5 * u_world) / u_world.y; }
float grain() { return hash(gl_FragCoord.xy + fract(u_time * 7.0) * 100.0) - 0.5; }
// Anti-aliased square, side = size (0..1 of the cell), centred in cell-local coords f; cs = cell size in px.
float box(vec2 f, float size, float cs) {
  vec2 d = abs(f - 0.5);
  float aa = 1.0 / cs;
  return 1.0 - smoothstep(size * 0.5 - aa, size * 0.5 + aa, max(d.x, d.y));
}
float ripple(vec2 uv) {
  float age = u_time - u_click.z;
  if (age < 0.0 || age > 3.0) return 0.0;
  float d = length(uv - aspectUv(u_click.xy));
  float r = age * 0.7;
  return sin((d - r) * 38.0) * exp(-abs(d - r) * 10.0) * exp(-age * 1.4);
}
`;

/** Flowing silk folds; the pointer lenses the cloth, clicks send a ripple through it. */
export const SILK = /* glsl */ `
void main() {
  vec2 uv = fragUv();
  vec2 m = aspectUv(u_mouse);
  float t = u_time * 0.32;
  vec2 dm = uv - m;
  float md = length(dm);
  vec2 p = uv * 1.15 + dm * 0.22 * exp(-md * md * 5.0);
  p += 0.035 * ripple(uv) * normalize(dm + 1e-4);
  for (int i = 1; i < 6; i++) {
    float fi = float(i);
    p.x += 0.32 / fi * sin(fi * 2.1 * p.y + t * 1.25 + fi * 1.7);
    p.y += 0.28 / fi * cos(fi * 1.7 * p.x + t * 1.05 + fi * 2.3);
  }
  float f = 0.5 + 0.5 * sin(p.x * 1.9 + p.y * 1.4);
  float sheen = pow(0.5 + 0.5 * sin(p.x * 5.5 + p.y * 2.7 - t * 1.6), 10.0);
  vec3 col = pal(f * 0.82);
  col += u_c2 * sheen * 0.22;
  col += u_c3 * 0.22 * exp(-md * 3.2);
  col *= 1.0 - 0.32 * dot(uv * 0.85, uv * 0.85);
  col += grain() * 0.035;
  o = vec4(col, 1.0);
}`;

/** Domain-warped smoke (the original prop), faster, with a heat bloom under the pointer. */
export const EMBER = /* glsl */ `
void main() {
  vec2 uv = fragUv();
  vec2 m = aspectUv(u_mouse);
  float t = u_time;
  float md = length(uv - m);
  vec2 q = vec2(fbm(uv * 1.4 + t * 0.09), fbm(uv * 1.4 - t * 0.07 + 3.1));
  vec2 r = vec2(fbm(uv * 1.2 + q * 1.8 + vec2(1.7, 9.2) + t * 0.12), fbm(uv * 1.2 + q * 1.8 + vec2(8.3, 2.8) - t * 0.1));
  vec2 w = uv + r * 0.9 + (uv - m) * 0.3 * exp(-md * 3.0);
  float f = fbm(w * 1.5 + ripple(uv) * 0.25);
  vec3 col = pal(smoothstep(0.2, 0.95, f));
  col += u_c3 * 0.45 * exp(-md * 3.5) * smoothstep(0.35, 0.85, f);
  col *= 1.0 - 0.3 * dot(uv, uv);
  col += grain() * 0.04;
  o = vec4(col, 1.0);
}`;

/** Slow lava-lamp metaballs; one blob follows the pointer. */
export const LAVA = /* glsl */ `
void main() {
  vec2 uv = fragUv();
  vec2 m = aspectUv(u_mouse);
  float t = u_time * 0.35;
  float ar = u_res.x / u_res.y;
  float field = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 c = vec2(sin(t * (0.6 + fi * 0.13) + fi * 1.9) * 0.42 * ar, cos(t * (0.5 + fi * 0.11) + fi * 2.7) * 0.36);
    float rad = 0.13 + 0.04 * sin(t * 1.3 + fi);
    field += rad * rad / dot(uv - c, uv - c);
  }
  field += 0.02 / dot(uv - m, uv - m);
  field += ripple(uv) * 0.3;
  float body = smoothstep(0.9, 1.5, field);
  float edge = smoothstep(0.75, 1.0, field) - smoothstep(1.0, 1.35, field);
  vec3 bg = pal(0.05 + 0.15 * (uv.y + 0.5));
  float fc = min(field, 2.5);
  vec3 blob = pal(0.45 + 0.4 * (0.5 + 0.5 * sin(fc * 0.9 + t)));
  vec3 col = mix(bg, blob, body);
  col += u_c3 * edge * 0.35 + u_c2 * fc * 0.03;
  col *= 1.0 - 0.25 * dot(uv, uv);
  col += grain() * 0.05;
  o = vec4(col, 1.0);
}`;

/** Stripe-style mesh gradient: four drifting colour points, one steered by the pointer. Heavy grain. */
export const MESH = /* glsl */ `
void main() {
  vec2 uv = fragUv();
  vec2 m = aspectUv(u_mouse);
  float t = u_time * 0.25;
  float ar = u_res.x / u_res.y;
  vec2 w = uv + 0.18 * vec2(fbm(uv * 1.3 + t), fbm(uv * 1.3 - t + 4.0)) + ripple(uv) * 0.04;
  vec2 p0 = vec2(-0.55 * ar + 0.15 * sin(t * 1.3), 0.3 + 0.12 * cos(t));
  vec2 p1 = vec2(0.5 * ar + 0.12 * cos(t * 1.1), 0.35 * sin(t * 0.8));
  vec2 p2 = vec2(0.1 * sin(t * 0.7), -0.45 + 0.1 * sin(t * 1.4));
  vec3 c[4] = vec3[4](u_c0, u_c1, u_c2, u_c3);
  vec2 pts[4] = vec2[4](p0, p1, p2, m);
  vec3 acc = vec3(0); float ws = 0.0;
  for (int i = 0; i < 4; i++) {
    float d = length(w - pts[i]);
    float wt = 1.0 / pow(d * d + (i == 3 ? 0.08 : 0.04), 1.5) * (i == 3 ? 0.6 : 1.0);
    acc += c[i] * wt; ws += wt;
  }
  vec3 col = acc / ws;
  col += grain() * 0.07;
  o = vec4(col, 1.0);
}`;

/** Halftone dot field over moving noise; dots swell around the pointer. */
export const HALFTONE = /* glsl */ `
void main() {
  float cell = u_res.y / 70.0;
  vec2 g = gl_FragCoord.xy / cell;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  vec2 cuv = ((id + 0.5) * cell - 0.5 * u_res) / u_res.y;
  vec2 m = aspectUv(u_mouse);
  float t = u_time;
  float v = fbm(cuv * 1.6 + vec2(t * 0.12, -t * 0.08));
  v += 0.55 * exp(-length(cuv - m) * 4.5);
  v += ripple(cuv) * 0.4;
  float r = 0.48 * smoothstep(0.3, 1.0, v);
  float aa = 1.5 / cell;
  float d = smoothstep(r + aa, r - aa, length(f));
  vec3 col = mix(u_c0, pal(0.35 + v * 0.65), d);
  o = vec4(col, 1.0);
}`;

/** Topographic contour lines; the pointer raises a hill. Made for light sections. */
export const CONTOURS = /* glsl */ `
void main() {
  vec2 uv = fragUv();
  vec2 m = aspectUv(u_mouse);
  float t = u_time;
  float h = fbm(uv * 1.3 + vec2(t * 0.04, t * 0.025));
  h += 0.35 * exp(-dot(uv - m, uv - m) * 7.0);
  h += ripple(uv) * 0.04;
  float k = h * 16.0;
  float line = 1.0 - clamp(abs(fract(k - 0.5) - 0.5) / fwidth(k) - 0.5, 0.0, 1.0);
  float k5 = k / 5.0;
  float major = 1.0 - clamp(abs(fract(k5 - 0.5) - 0.5) / fwidth(k5) - 0.9, 0.0, 1.0);
  vec3 bg = mix(u_c0, u_c1, smoothstep(0.3, 0.8, h) * 0.6);
  vec3 col = mix(bg, u_c3, line * 0.18 + major * 0.32);
  col = mix(col, u_c2, 0.25 * exp(-length(uv - m) * 3.0));
  col += grain() * 0.025;
  o = vec4(col, 1.0);
}`;

/** Horizontal light streaks, like a long-exposure through blinds; the pointer is a light leak. */
export const STREAKS = /* glsl */ `
void main() {
  vec2 uv = fragUv();
  vec2 m = aspectUv(u_mouse);
  float t = u_time;
  vec2 p = vec2(uv.x * 0.45 - t * 0.06, uv.y * 7.0);
  float band = fbm(p + vec2(0.0, fbm(vec2(uv.x * 0.8 + t * 0.05, uv.y * 3.0)) * 1.5));
  band += 0.08 * sin(uv.y * 60.0 + t * 0.5);
  float leak = exp(-pow(length((uv - m) * vec2(0.5, 1.6)), 2.0) * 3.0);
  float glow = exp(-pow(length((uv - vec2(sin(t * 0.2) * 0.6, 0.1)) * vec2(0.6, 1.4)), 2.0) * 2.0);
  vec3 col = pal(band * 0.75 + leak * 0.35 + glow * 0.2 + ripple(uv) * 0.1);
  col *= 1.0 - 0.35 * dot(uv, uv);
  col += grain() * 0.05;
  o = vec4(col, 1.0);
}`;

/* ---------- Boxy card shaders (How it works) ---------- */

/** 01 · Send: packets of light streaming along rows of a grid. */
export const PACKETS = /* glsl */ `
void main() {
  float cs = max(10.0, u_res.y / 11.0);
  vec2 g = gl_FragCoord.xy / cs;
  vec2 id = floor(g), f = fract(g);
  float speed = 1.5 + hash(vec2(id.y, 7.0)) * 3.0;
  float x = id.x - u_time * speed;
  float pk = step(0.68, hash(vec2(floor(x / 5.0), id.y)));
  float on = pk * smoothstep(0.0, 1.0, fract(x / 5.0));
  vec2 cuv = ((id + 0.5) * cs - 0.5 * u_res) / u_res.y;
  on = max(on, 0.85 * exp(-length(cuv - aspectUv(u_mouse)) * 4.0));
  float b = box(f, 0.78, cs);
  vec3 col = u_c0 + u_c1 * 0.22 * b;
  col = mix(col, pal(0.45 + on * 0.55), on * b);
  col += grain() * 0.03;
  o = vec4(col, 1.0);
}`;

/** 02 · Build: blocks grow into place on a diagonal sweep, hold, then reset. */
export const ASSEMBLE = /* glsl */ `
void main() {
  float cs = max(12.0, u_res.y / 8.0);
  vec2 g = gl_FragCoord.xy / cs;
  vec2 id = floor(g), f = fract(g);
  vec2 n = u_res / cs;
  float cyc = fract(u_time * 0.11 - 0.25); // phase-shifted so it opens half-built, not mid-reset
  float order = (id.x + (n.y - id.y) * 0.7) / (n.x + n.y * 0.7) * 0.8 + hash(id) * 0.18;
  float grow = smoothstep(order, order + 0.08, cyc * 1.15) * (1.0 - smoothstep(0.9, 1.0, cyc));
  vec2 cuv = ((id + 0.5) * cs - 0.5 * u_res) / u_res.y;
  float press = exp(-length(cuv - aspectUv(u_mouse)) * 5.0);
  float b = box(f, 0.84 * grow * (1.0 - 0.25 * press), cs);
  float slot = box(f, 0.84, cs) - box(f, 0.8, cs);
  vec3 col = u_c0 + u_c1 * 0.5 * slot;
  col = mix(col, pal(0.3 + hash(id + 3.0) * 0.65), b);
  col += grain() * 0.03;
  o = vec4(col, 1.0);
}`;

/** 03 · Try: square halftone ripples, like taps on a screen; the pointer is a finger. */
export const TAPS = /* glsl */ `
void main() {
  float cs = max(8.0, u_res.y / 15.0);
  vec2 g = gl_FragCoord.xy / cs;
  vec2 id = floor(g), f = fract(g);
  vec2 cuv = ((id + 0.5) * cs - 0.5 * u_res) / u_res.y;
  vec2 m = aspectUv(u_mouse);
  vec2 drift = vec2(sin(u_time * 0.4) * 0.35, cos(u_time * 0.3) * 0.2);
  float d1 = length(cuv - m), d2 = length(cuv - drift);
  float w = (0.5 + 0.5 * sin(d1 * 16.0 - u_time * 3.2)) * exp(-d1 * 1.6);
  w += (0.5 + 0.5 * sin(d2 * 12.0 - u_time * 2.4)) * 0.6 * exp(-d2 * 1.8);
  w += ripple(cuv) * 0.8;
  w = clamp(w, 0.0, 1.0);
  float b = box(f, 0.12 + w * 0.76, cs);
  vec3 col = mix(u_c0, pal(0.3 + w * 0.7), b);
  col += grain() * 0.03;
  o = vec4(col, 1.0);
}`;

/** 04 · Launch: columns rise like a level meter with sparks lifting off; the pointer boosts nearby columns. */
export const LIFTOFF = /* glsl */ `
void main() {
  float cs = max(10.0, u_res.y / 12.0);
  vec2 g = gl_FragCoord.xy / cs;
  vec2 id = floor(g), f = fract(g);
  vec2 cuv = ((id + 0.5) * cs - 0.5 * u_res) / u_res.y;
  vec2 m = aspectUv(u_mouse);
  float y01 = (id.y + 0.5) * cs / u_res.y;
  float h = 0.18 + 0.55 * noise(vec2(id.x * 0.35, u_time * 0.7)) + 0.3 * exp(-abs(cuv.x - m.x) * 5.0);
  float lit = step(y01, h);
  float top = 1.0 - step(cs / u_res.y, abs(y01 - h));
  float spark = step(0.965, hash(vec2(id.x, floor(id.y - u_time * 5.0)))) * step(h, y01);
  float b = box(f, 0.8, cs);
  vec3 col = u_c0 + u_c1 * 0.14 * b;
  col = mix(col, pal(0.25 + y01 * 0.55), lit * b);
  col = mix(col, u_c3, max(top * lit, spark * 0.75) * b);
  col += grain() * 0.03;
  o = vec4(col, 1.0);
}`;
