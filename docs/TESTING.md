# Manual browser checks

Automated model tests are intentionally separate from browser verification. Run this checklist in a current Chromium, Firefox or Safari browser; do not mark unrun checks as passed.

## Recorded verification: 2026-10-10

An independent reviewer exercised the real Chromium staging editor at a desktop viewport. These checks passed:

- Export HTML → reopen that HTML in the editor → replace its screenshot with a 600 × 1200 PNG → export again.
- Replacement retained the annotations and normalized hotspot position/size (44%, 57%, 52 px).
- Removing a hotspot removed its target from preview.
- Reordering restored keyboard focus to the selected screen.
- Title/caption edits, literal script text in preview, hotspot keyboard movement and resizing, click-to-advance, End and Escape.
- Malicious appended script/iframe HTML remained inert during import; no alert or page-title change occurred.
- Malformed raster import retained the current project; multiple PNG import and cancelled deletion worked.
- Portrait aspect ratio remained correct: editor 571 × 1142; preview approximately 246 × 492.

A preview-opening focus issue scrolled the Close control out of view. The fix prevents focus-induced scrolling and resets the dialog to its top; its source-level regression test is automated. A browser retest of that fix is pending.

Not yet verified: actual standalone file:// playback with network disabled, offline network-request inspection, mobile/tablet layout, cross-browser behavior, or every checklist item below. Browser resizing/network tracing were unavailable in the review environment; blocked DevTools were not bypassed. Successful export and reimport do not prove all of those behaviors.

## Authoring

- Example opens with three original Fern screens; no runtime error appears.
- Edit project title, headline, caption and next label; preview matches.
- Add several PNG, JPG and WebP images by picker and drop; order matches input.
- Reorder screens both directions; selection follows the moved screen.
- Cancel delete/new/import confirmations without losing state; confirm deletion.
- Remove all screens; empty state can add a first image again.
- Click image to place hotspot; Tab to target and use arrows / Shift+arrows.
- Change target size; remove target and confirm preview contains no ghost target.
- Replace a screenshot; text, order and hotspot proportions remain unchanged.
- Try an invalid image and an oversized file; existing project stays intact.
- Processing an import/replacement disables editor changes until it finishes.

## Player and export

- Preview shows full image at correct aspect ratio.
- Target and next buttons advance; back returns; last-screen action restarts.
- ArrowLeft/Right, Home and End work while player is focused.
- Close/reopen preview repeatedly; Escape works and focus returns.
- Export HTML, open the actual downloaded file and disable network.
- Complete every screen with mouse and keyboard while offline.
- Confirm no remote network requests are made by the exported file.
- Save JSON, reopen it and compare all content and target positions.
- Reopen exported HTML in editor, replace one screenshot and re-export.
- Attempt import of unrelated/script-bearing HTML: do not execute it; no recognized data must be rejected.
- Test captions containing `</script>`, `<img onerror=...>` and Unicode: display literal text.

## Layout and accessibility

- Inspect desktop 1440×1000, tablet 800×1000 and mobile 390×844.
- Check no page-wide horizontal overflow, clipped controls or obscured dialogs.
- Test wide and portrait images; hotspot must align with actual rendered image.
- Keyboard-only traversal reaches all meaningful buttons and fields.
- Disabled controls are correctly disabled; focus indicators remain visible.
- Browser zoom to 200%; controls stay reachable.
- Inspect reduced-motion preference and readable screen-reader step announcements.
