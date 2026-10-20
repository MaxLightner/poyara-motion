# Render output
Generated video files belong in ignored `out/`; do not commit rendered MP4 to a source folder.
Use `npm run render:project -- mizato out/mizato-explainer.mp4 landscape` for Mizato.
Use `npm run render:project -- poyara out/poyara-square.mp4 square src/projects/poyara/posts/sample.json` for POYARA.
CI publishes downloadable GitHub Actions artifacts; Mizato additionally publishes release assets.
