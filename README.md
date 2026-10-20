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

[Download the 13-second sample MP4](https://github.com/MaxLightner/poyara-motion/raw/refs/heads/main/samples/poyara-sample.mp4).

Open **Actions → Render MP4 → Run workflow**, select the JSON filename and square/portrait. Once the run succeeds, open **Artifacts** and download the MP4 ZIP (GitHub sign-in may be required). Every push to main also renders the sample. Artifacts expire after 30 days; download before expiry or run again.

GitHub stores the project; Remotion runs inside GitHub Actions to turn its code and JSON into a video. No separate Remotion account or hosted editor is needed for this workflow.

## Later automation

DeepSeek or n8n can generate the same JSON structure, validate it with `postSchema` in `src/schema.mjs`, commit a file under `posts/`, then trigger `workflow_dispatch` with `post` and `format`. This initial version deliberately makes no AI calls and needs no secrets. Review generated copy before committing: this repository and its Actions logs/artifacts are public. Never place unreleased product details or credentials here.

The schema bounds text and duration and checks that steps contain items. Brand animation is in `src/motion.tsx`; composition sizing is in `src/index.tsx`. Rendering uses the [official Remotion CLI](https://www.remotion.dev/docs/render) and [JSON input props](https://www.remotion.dev/docs/options/props).

Remotion has its own [license and commercial terms](https://www.remotion.dev/license); review them for your organization. No license is granted here for POYARA branding.

## Mizato: restaurant ordering explainer (Remotion)

The repository also includes **MizatoExplainer**, a self-contained **1920×1080 / 30 fps / 50-second** animated Persian explainer. This is not the POYARA typography template. It shows a stylized restaurant, a QR scan, a mobile food menu, visual meal comparison, a contextual drink/dessert suggestion, and the waiter's order approval before kitchen confirmation. Food illustrations, phone mockups and character/environment elements are composed with SVG and CSS in Remotion.

The film includes original, generated instrumental music but **no recorded narration**. Copy and prices are illustrative demo content, not connected to the production Mizato backend. The QR pattern in the animation is decorative and is not a working table QR.

To preview locally:
```sh
npm ci
node scripts/music.mjs
npm run studio  # select MizatoExplainer
```

To render a 1080p MP4:
```sh
node scripts/music.mjs
npx remotion render src/index.tsx MizatoExplainer out/mizato-explainer.mp4 --codec=h264 --pixel-format=yuv420p
```

[Render Mizato Explainer workflow](https://github.com/MaxLightner/poyara-motion/actions/workflows/mizato.yml) builds the video, provides a full-HD artifact with a proof frame, and publishes the public `mizato-preview-v1` release. The existing POYARA post workflow remains unchanged.
