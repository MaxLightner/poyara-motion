/** Frame-relative eased motion utilities; keep rendering deterministic. */
export const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));
export const progress = (frame: number, from: number, to: number): number => to === from ? Number(frame >= to) : clamp01((frame - from) / (to - from));
export const smoothstep = (v: number): number => v * v * (3 - 2 * v);
export const ease = (frame: number, from: number, to: number): number => smoothstep(progress(frame, from, to));
export const pulse = (frame: number, speed = 1): number => Math.sin(frame * speed / 9);
// Legacy scene shorthand; still shared rather than independently reimplemented.
export const s = ease;
