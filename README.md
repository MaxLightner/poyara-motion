# POYARA Motion

Minimal, JSON-driven LinkedIn motion graphics. Charcoal, warm copper and off-white styling follows the POYARA website draft. Two reusable layouts (`statement`, `steps`), two sizes: 1080×1080 and 1080×1350, 30 fps, silent H.264 MP4. No product screenshots, product names, roadmap details or external assets.

## Quick start

Node.js 22 recommended.

```sh
npm ci
npm run studio
npm run check
npm test
npm run build
npm run render
npm run render -- posts/persian.json portrait out/poyara-persian.mp4
```

Edit `posts/sample.json` or copy it to another JSON file. Scene duration controls the full timeline automatically. Use `direction: "rtl"` for Persian; the default font is system Arial. Preview long copy in Studio before posting. The examples contain generic learning prompts only. The initial version has no soundtrack.

## Download an MP4 without installing anything

Open **Actions → Render MP4 → Run workflow**, select the JSON filename and square/portrait. Once the run succeeds, open **Artifacts** and download the MP4 ZIP (GitHub sign-in may be required). Every push to main also renders the sample. Artifacts expire after 30 days; download before expiry or run again.

GitHub stores the project; Remotion runs inside GitHub Actions to turn its code and JSON into a video. No separate Remotion account or hosted editor is needed for this workflow.

## Later automation

DeepSeek or n8n can generate the same JSON structure, validate it with `postSchema` in `src/schema.mjs`, commit a file under `posts/`, then trigger `workflow_dispatch` with `post` and `format`. This initial version deliberately makes no AI calls and needs no secrets. Review generated copy before committing: this repository and its Actions logs/artifacts are public. Never place unreleased product details or credentials here.

The schema bounds text and duration and checks that steps contain items. Brand animation is in `src/motion.tsx`; composition sizing is in `src/index.tsx`. Rendering uses the [official Remotion CLI](https://www.remotion.dev/docs/render) and [JSON input props](https://www.remotion.dev/docs/options/props).

Remotion has its own [license and commercial terms](https://www.remotion.dev/license); review them for your organization. No license is granted here for POYARA branding.
