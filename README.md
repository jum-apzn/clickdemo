# ClickDemo

**Turn screenshots into a demo anyone can click. Keep it as one editable HTML file.**

ClickDemo is a small, local-first screenshot demo editor. Drop in a few screens, add captions and a click target, and export a standalone walkthrough. Open that same HTML file in ClickDemo later, replace an outdated screenshot, and export the refreshed demo.

No account. No API key. No backend. No screenshot uploads. No runtime dependencies.

## Try it locally

Requires Node.js 22 or newer for the development server and tests. The editor itself is plain browser JavaScript.

```sh
npm start
# Open http://localhost:4173
```

No `npm install` is needed. Any static HTTP server works, too. The editor uses ES modules, so serve the source over HTTP rather than opening `index.html` through `file://`.

**Exported demos are different:** download the generated HTML and open it directly in a browser, even offline. Its player, images, styles, and editable project data are all embedded in the file.

## The useful loop

1. **Start with something real.** Load PNG, JPG or WebP screenshots, or explore the included original three-screen example.
2. **Guide the next click.** Give each screen a headline and caption. Click its image to position one circular advance target. Resize it with the slider; use arrow keys for fine positioning.
3. **Make it yours.** Reorder or delete screens. Preview the walkthrough with back/next controls, progress, restart and keyboard navigation.
4. **Take it anywhere.** Export one HTML file for your docs, a static website, a sales follow-up or an offline presentation.
5. **Refresh it later.** Choose **Open demo / project** and load the exported HTML or JSON project. Use **Replace screenshot** to update the selected image while retaining its text, order and proportional hotspot position.

Hotspots use normalized image coordinates. Replacement preserves their proportions, **not the identity of the UI element underneath**. If a button moved in your new screenshot, reposition its target before exporting.

## What it includes

- Drag-and-drop or multiple-file screenshot import
- Ordered steps with captions and customizable next-button labels
- One optional, resizable advance hotspot per step
- Accessible button controls and keyboard player navigation
- Responsive editor and player layouts
- Shared player implementation for preview and export
- Self-contained HTML export with no CDN, analytics or remote assets
- Editable JSON project export/import
- Exported HTML reimport without executing the imported file
- In-place screenshot replacement
- Synthetic example screens drawn locally with Canvas
- MIT-licensed source; no forced visible watermark

## Privacy, safety and limits

All authoring happens in your browser. No screenshot or project data is sent to an application server. Serving the editor still makes ordinary requests to its static host.

**Local does not mean safe to share.** Exported HTML and JSON contain the full original screenshot images and text. Check for personal information, credentials and private interface details before sharing. Replacing or removing a screenshot does not redact another screenshot. This is not a redaction tool.

There is **no automatic saving** in this version. Save a project before closing the tab. The app warns about unsaved changes when the browser supports it. A downloaded HTML file also preserves editable data.

Current limits:

| Limit | Value |
| --- | --- |
| Screens per project | 20 |
| Single source image | 8 MiB |
| Combined image data | 40 MiB |
| Single decoded image | 24 megapixels |
| Imported project file | 60 MiB |
| Title / step headline | 120 characters |
| Caption | 500 characters |

Imports accept embedded PNG/JPEG/WebP images only. No SVG, external image URLs, imported scripts or arbitrary HTML rendering. HTML import extracts only the recognized inert JSON payload and validates and decodes its images before replacing the current project. Unrelated HTML is rejected. Labels and captions are rendered as text; embedded JSON escapes script-breaking characters.

The editor does not execute an imported HTML document. As with any HTML received from someone else, do not open an untrusted file directly in a browser and assume it is safe merely because its filename mentions ClickDemo.

## Scope

This is intentionally a compact linear-demo tool. It is not a screen recorder, video exporter, analytics platform, collaborative authoring service, DOM capture tool, automatic redactor or branching simulation. Browser email previews and services that strip JavaScript may not run HTML attachments; recipients should download and open the file in a browser, or you can host it as a static page.

The last screen's main action restarts the demo. Arrow keys stop at the first/last screen; Home and End jump to the ends. Hotspots are optional because back/next controls always remain available.

## Development

```sh
npm run check
npm test
npm start
```

- `src/model.js`: import validation, serialization and safe embedded data
- `src/player.js`: shared DOM player and standalone HTML exporter
- `src/example.js`: original synthetic example artwork
- `src/app.js`: editor state and local file handling
- `src/style.css`: responsive interface
- `tests/model.test.mjs`: dependency-free Node unit tests

The automated tests cover project round trips, HTML data extraction, text escaping, invalid schema rejection and export dependency constraints. They do not replace real browser checks of downloads, image decoding, layout, keyboard focus or touch interactions. See [the manual test checklist](docs/TESTING.md).

No build step is needed for deployment. Publish `index.html` and `src/` to any static host, including a project subdirectory. All assets use relative paths.

## Related tools

Screenshot demos are an established category. [Spotlane](https://github.com/headlessButSmart/spotlane) offers JSON project export/import and a React player. [DemoFlow](https://www.demoflow.dev/) offers standalone HTML demos and API/CLI workflows. ClickDemo is a compact, dependency-free browser editor focused on local authoring, HTML reimport and in-place screenshot replacement. This is a workflow choice, not a claim to have invented editable demos or HTML exports.

## Contributing

Small fixes and focused improvements are welcome. Keep the exported file self-contained, keep imports inert, avoid telemetry and backend requirements, and cover format changes with tests. Please open an issue before large feature additions. The project format currently uses `version: 1`.

## License

MIT for the application code and synthetic example. Your uploaded images and written content remain yours. See [LICENSE](LICENSE).
