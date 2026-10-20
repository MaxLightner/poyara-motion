import {z} from 'zod';
export const postSchema = z.object({
  direction: z.enum(['ltr', 'rtl']).default('ltr'),
  footer: z.string().min(1).max(55),
  scenes: z.array(z.object({
    layout: z.enum(['statement', 'steps']),
    eyebrow: z.string().min(1).max(35),
    title: z.string().min(1).max(70),
    body: z.string().max(120).optional(),
    items: z.array(z.string().min(1).max(45)).min(1).max(3).optional(),
    duration: z.number().min(3).max(12),
  }).superRefine((scene, ctx) => {
    if (scene.layout === 'steps' && !scene.items) ctx.addIssue({code: 'custom', message: 'Steps scenes require items', path: ['items']});
  })).min(1).max(10),
});
export const framesFor = (post, fps = 30) => post.scenes.reduce((sum, scene) => sum + Math.round(scene.duration * fps), 0);
