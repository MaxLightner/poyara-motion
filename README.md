# POYARA Motion — multi-product Remotion engine

Reusable motion graphics repository for **Mizato, POYARA, Chido and Kamcheh**, currently with production compositions for Mizato and POYARA only. The visuals are Remotion/React/TypeScript; GitHub Actions renders MP4.

## Repository map

```
src/
├── core/
│   ├── animation/        # deterministic frame easing / pulses
│   ├── components/       # reusable Glass and MobileDevice
│   ├── typography/       # Persian/RTL font fallback and Text
│   └── audio/            # reusable soundtrack component
├── projects/
│   ├── mizato/
│   │   ├── scenes/       # six individually animated scenes + Film timeline
│   │   ├── components/   # menu UI, restaurant, QR, waiter and food
│   │   ├── assets/       # product asset conventions
│   │   ├── audio/        # original music generator
│   │   ├── theme.ts
│   │   └── script.json   # editable timings, captions, scene order
│   ├── poyara/           # JSON-driven LinkedIn templates
│   ├── chido/            # reserved boundary; no video yet
│   └── kamcheh/          # reserved boundary; no video yet
├── index.tsx             # composition registry
└── {mizato,motion,schema}.*  # compatibility imports
scripts/                  # stable CLI and compatibility commands
tests/                    # schema/timing/structure tests
render/                   # output conventions; actual MP4s in ignored out/
```

## Setup

Node 22 recommended.

```sh
npm ci
npm run check && npm test && npm run build
node scripts/music.mjs
npm run studio             # MizatoExplainer, PoyaraSquare, PoyaraPortrait
```

## Rendering

```sh
npm run render:project -- mizato out/mizato-explainer.mp4 landscape
npm run render:project -- poyara out/poyara.mp4 square src/projects/poyara/posts/sample.json
npm run render:project -- poyara out/poyara-persian.mp4 portrait src/projects/poyara/posts/persian.json
```

Legacy commands still work: `npm run render`, `npm run render -- posts/persian.json portrait out/poyara-persian.mp4`. New POYARA JSON files should live in `src/projects/poyara/posts/`; the renderer maps the old `posts/name.json` argument to the new location.

## Mizato visual explainer

50 seconds, 1920×1080, 30fps, 6 animated scenes. The film depicts QR menu discovery, side-by-side comparison, a contextual drink/dessert suggestion, and a waiter's confirmation flowing to kitchen review. Built from CSS/SVG and composited React elements. Music is original synthesized instrumental; **no recorded narration**. Demo items/prices are illustrative and not linked to the actual product backend. The displayed QR is decorative, not a live table QR.

To edit timing or captions, change `src/projects/mizato/script.json`. Total composition frames follow that script. **Important:** each scene's choreography currently contains fixed local frame offsets, so changing duration considerably also requires reviewing the corresponding scene in `scenes/` and keeping the soundtrack duration in sync. This is a separated production layout, not yet a fully data-generated movie.

[Mizato MP4 release](https://github.com/MaxLightner/poyara-motion/releases/tag/mizato-preview-v1) · [Mizato render workflow](https://github.com/MaxLightner/poyara-motion/actions/workflows/mizato.yml)

## POYARA posts

POYARA is JSON driven with `statement` and `steps` scenes. Use `direction: "rtl"` for Persian and the schema in `src/projects/poyara/schema.mjs`. Two output layouts are available: 1080×1080 and 1080×1350. Generic copy is used in the public examples and the template has no soundtrack.

[13-second original sample MP4](https://github.com/MaxLightner/poyara-motion/raw/refs/heads/main/samples/poyara-sample.mp4) · [POYARA render workflow](https://github.com/MaxLightner/poyara-motion/actions/workflows/render.yml)

## Automation and public repository security

An agent/n8n can write POYARA post JSON, validate it, commit, and dispatch the render workflow. The Mizato film currently requires React scene code for new visual actions. Do not commit API keys, unreleased roadmap details, proprietary customer menus, or sensitive media: the repository, workflow logs and releases are public. Review Remotion's commercial license terms before production distribution.

Generated videos go under ignored `out/` and are distributed as CI artifacts or GitHub releases, not stored alongside source code.

## Mizato continuous-flow V2

V2 is a distinct composition (`MizatoFlow`), preserving the original `MizatoExplainer` and POYARA video templates. It shows one persistent restaurant world rather than remounting self-contained slides. Animated UI panels ease in/out on top of the same background and move between customer, waiter, kitchen and manager.

The story is paced as connected beats: waiter time, QR and simple ordering, food choice, waiter notification, order approval, customer status, post-service feedback, manager price/stock/discount edits and a unified end frame. No unverified promise of lower staffing requirements or numerical ROI is made. Statuses and pricing in the video are illustrative product demonstrations, not live data.

The timeline and subtitles are in `src/projects/mizato/flow-script.json`; the visual direction and reusable panels are implemented in `src/projects/mizato/scenes/Flow.tsx`. To render:
```sh
npm run render:project -- mizato-flow out/mizato-flow-v2.mp4 landscape
```
The new GitHub Action `mizato-flow.yml` renders a Full-HD MP4, saves four proof frames and publishes a separate release tagged `mizato-flow-v2`. Soundtrack is independently synthesized for this version and contains no narration. The V1 release remains available.
